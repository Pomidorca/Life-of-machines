import {
    defineStore
} from "pinia";
import {ref} from "vue";
import {CarryingOutVolumes, DynamicsUnitCosts, DynamicsUnitCostsTwo} from "@/components/Charts/TEI/index.js";
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
            initialDynamicsUnitCosts: DynamicsUnitCosts,
            initialDynamicsUnitCostsTwo: DynamicsUnitCostsTwo,
            colors: [
                { background: 'rgba(255, 99, 132, 1)', border: 'rgba(255, 99, 132, 1)' },
                { background: 'rgba(54, 162, 235, 1)', border: 'rgba(54, 162, 235, 1)' },
                { background: 'rgba(255, 206, 86, 1)', border: 'rgba(255, 206, 86, 1)' },
                { background: 'rgba(75, 192, 192, 1)', border: 'rgba(75, 192, 192, 1)' },
                { background: 'rgba(153, 102, 255, 1)', border: 'rgba(153, 102, 255, 1)' },
                { background: 'rgba(255, 159, 64, 1)', border: 'rgba(255, 159, 64, 1)' },
                { background: 'rgb(99, 255, 64)', border: 'rgb(99, 255, 64, 1)' },
            ]
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

                        const elementData = []

                        const costTypes = []

                        const labelsDynamics = []

                        const objectDynamicsUnitCosts = {
                            labels: [],
                            datasets: []
                        };

                        data.map((item, index) => {

                            item.data.map((element) => {

                                if (!labelsDynamics.includes(element.combinedDate)) {
                                    labelsDynamics.push(element.combinedDate);
                                }
                            })

                            costTypes.push(item.typeName)

                        })

                        objectDynamicsUnitCosts.labels = labelsDynamics

                        costTypes.forEach((type, index) => {
                            const colorIndex = index % this.colors.length;

                            objectDynamicsUnitCosts.datasets.push({
                                label: type,
                                data: [],
                                backgroundColor: this.colors[colorIndex].background,
                                borderColor: this.colors[colorIndex].border,
                                borderWidth: 1,
                                pointRadius: 0,
                            });
                        });


                        data.forEach((item, index) => {

                            elementData.length = 0

                            item.data.forEach(element => {
                                if (!labelsDynamics.includes(element.combinedDate)) {
                                    labelsDynamics.push(element.combinedDate);
                                }
                                elementData.push(element.productivity)


                            });

                            objectDynamicsUnitCosts.datasets[index].data = elementData.map(item => {
                                return item
                            })

                        });


                        if (objectDynamicsUnitCosts && Object.keys(objectDynamicsUnitCosts).length > 0) {
                            this.initialDynamicsUnitCosts.labels = objectDynamicsUnitCosts.labels;
                            this.initialDynamicsUnitCosts.datasets = objectDynamicsUnitCosts.datasets
                        }

                    })
                    .catch((e) => {
                        console.log('Ошибка на стороне сервера ' + e)
                        // this.error = 'Статус - ' + e.status
                    })

                await TEPDataService.getDinamicsUnitCosts( dateStart, dateEnd, breakdownType, machineTypeIds, machineClassIds)
                    .then((response) => {

                        const labels = []

                        const data = response.data

                        const dataLength = 0

                        const elementData = []

                        const objectDynamicsUnitCosts = {
                            datasets: []
                        };

                        data.map((item, index) => {

                            elementData.length = 0

                            item.data.map((element) => {

                                if (!labels.includes(element.combinedDate)) {

                                    labels.push(element.combinedDate)

                                    console.log(labels)

                                }

                                if (index === data.length - 1) {

                                    elementData.push(element.totalCostToProductivityRatio)

                                } else {

                                    elementData.push(element.costToProductivityRatio)

                                }

                            })

                            const colorIndex = index % this.colors.length;

                            objectDynamicsUnitCosts.datasets.push({
                                label: item.kindName,
                                data: [],
                                backgroundColor: this.colors[colorIndex].background,
                                ...(index === data.length - 1 ? {borderColor: this.colors[colorIndex].border} : {}),
                                ...(index === data.length - 1 ? {type: 'line'} : {})
                            });

                            objectDynamicsUnitCosts.datasets[index].data = elementData.map(item => {
                                return item
                            })

                        })

                        if (objectDynamicsUnitCosts.datasets.length > 0) {
                            const lastDataset = objectDynamicsUnitCosts.datasets.pop();
                            objectDynamicsUnitCosts.datasets.unshift(lastDataset);
                        }

                        if (objectDynamicsUnitCosts && Object.keys(objectDynamicsUnitCosts).length > 0) {
                            this.initialDynamicsUnitCostsTwo.labels = labels;
                            this.initialDynamicsUnitCostsTwo.datasets = objectDynamicsUnitCosts.datasets
                        } else {
                            throw new Error('Пустой объект')
                        }

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

