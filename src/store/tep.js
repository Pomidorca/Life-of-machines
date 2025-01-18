import {
    defineStore
} from "pinia";
import {ref} from "vue";
import {CarryingOutVolumes} from "@/components/Charts/TEI/index.js";
import {useMachineStore} from "@/store/machine.js";
import TEPDataService from "@/services/TEPDataService.js";
import {useAuthStore} from "@/store/auth.js";

export const useTEPStore = defineStore("TEP", {
    state: () => {
        return {
            loading: false,
            error: null,
            breakdownType: null,
            filterParams: ref({
                dateStart: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10),
                dateEnd: new Date().toISOString().slice(0, 10),
                breakdownType: null,
                machineTypeIds: [],
            }),
            initialCarryingOutVolumes: CarryingOutVolumes
        }
    },
    actions: {

        async fetchTEP(toggle) {

            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.accessToken;

            if (!token) {
                this.error = "Token not found!";
                this.loading = false;
                return;
            }

            try {

                const storedFilterDate = localStorage.getItem('filterDate');

                if (storedFilterDate) {

                    const parsedFilterDate = JSON.parse(storedFilterDate);

                    this.filterParams.dateStart = new Date(parsedFilterDate.startDate).toISOString().slice(0, 10);
                    this.filterParams.dateEnd = new Date(parsedFilterDate.endDate).toISOString().slice(0, 10);
                }

                const machineStore = useMachineStore();

                this.filterParams.machineTypeIds = machineStore.selectedMachineTypeIds;

                if (toggle) {
                    this.breakdownType = toggle
                }

                const { dateStart, dateEnd, breakdownType, machineTypeIds } = this.filterParams;

                TEPDataService.getVolumeFulfillmentExtraction( dateStart, dateEnd, breakdownType, machineTypeIds)
                    .then((response) => {

                        const data = response.data

                        const labels = []

                        const coefficient = []

                        const volumeExtraction = []

                        const volumeStripping = []

                        data.map((item, index) => {

                            labels.push(item.combinedDate)

                            coefficient.push(item.coefficient)

                            volumeExtraction.push(item.extraction)

                            volumeStripping.push(item.stripping)
                        })

                        this.initialCarryingOutVolumes.labels = labels

                        this.initialCarryingOutVolumes.datasets[0].data = coefficient

                        this.initialCarryingOutVolumes.datasets[1].data = volumeStripping

                        this.initialCarryingOutVolumes.datasets[2].data = volumeExtraction

                    })
                    .catch((e) => {
                        console.log(e)
                    })

            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false;
            }

        },

        updateFilterParams(params) {
            this.$patch(state => {
                Object.assign(state.filterParams, params);
            });
            this.fetchTEP();
        }

    }
})

