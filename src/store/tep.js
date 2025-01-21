import {
    defineStore
} from "pinia";
import {ref} from "vue";
import {CarryingOutVolumes, DynamicsUnitCosts} from "@/components/Charts/TEI/index.js";
import {useMachineStore} from "@/store/machine.js";
import TEPDataService from "@/services/TEPDataService.js";
import {useAuthStore} from "@/store/auth.js";

export const useTEPStore = defineStore("TEP", {
    state: () => {
        return {
            loading: false,
            error: true,
            breakdownType: null,
            filterParams: ref({
                dateStart: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10),
                dateEnd: new Date().toISOString().slice(0, 10),
                breakdownType: null,
                machineClassIds: 1,
                machineTypeIds: [],
            }),
            initialCarryingOutVolumes: CarryingOutVolumes,
            initialDynamicsUnitCosts: DynamicsUnitCosts
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
                    this.filterParams.breakdownType = toggle
                }

                const { dateStart, dateEnd, breakdownType, machineClassIds, machineTypeIds } = this.filterParams;

                await TEPDataService.getVolumeFulfillmentExtraction( dateStart, dateEnd, breakdownType, machineTypeIds, machineClassIds)
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
                        console.log('Ошибка на стороне сервера ' + e)
                        // this.error = 'Статус - ' + e.status
                    })

                await TEPDataService.getMonthlyParkProductivity( dateStart, dateEnd,  machineTypeIds, machineClassIds)
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
                        console.log('Ошибка на стороне сервера ' + e)
                        // this.error = 'Статус - ' + e.status
                    })

            } catch (error) {
                console.log(error)
                this.error = 'Внутренняя ошибка:' + error
            } finally {
                setTimeout(() => {
                    this.loading = false;
                }, 1000)
            }

        },

        updateFilterParams(params, toggle) {
            this.$patch(state => {
                Object.assign(state.filterParams, params);
            });

            this.fetchTEP(toggle);
        }

    }
})

