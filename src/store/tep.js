import {
    defineStore
} from "pinia";
import {ref} from "vue";
import {
    CarryingOutVolumes,
    DynamicsUnitCosts,
    DynamicsUnitCostsTwo,
    StructureKFV
} from "@/components/Charts/TEI/index.js";
import {useMachineStore} from "@/store/machine.js";
import TEPDataService from "@/services/TEPDataService.js";
import {useAuthStore} from "@/store/auth.js";

export const useTEPStore = defineStore("TEP", {
    state: () => {
        return {
            loading: false,
            error: true,
            loadingChartStructureKFV: false,
            errorChartStructureKFV: false,
            breakdownType: null,
            dateComparisonOfTargetAndActualUnitCosts: null,
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
            initialStructureKFV: StructureKFV,
            colors: [
                { background: 'rgba(255, 99, 132, 1)', border: 'rgba(255, 99, 132, 1)', opacity: 'rgba(255, 99, 132, 0.2)' },
                { background: 'rgba(54, 162, 235, 1)', border: 'rgba(54, 162, 235, 1)', opacity: 'rgba(54, 162, 235, 0.2)' },
                { background: 'rgba(255, 206, 86, 1)', border: 'rgba(255, 206, 86, 1)', opacity: 'rgba(255, 206, 86, 0.2)'},
                { background: 'rgba(75, 192, 192, 1)', border: 'rgba(75, 192, 192, 1)', opacity: 'rgba(75, 192, 192, 0.2)' },
                { background: 'rgba(153, 102, 255, 1)', border: 'rgba(153, 102, 255, 1)', opacity: 'rgba(153, 102, 255, 0.2)' },
                { background: 'rgba(255, 159, 64, 1)', border: 'rgba(255, 159, 64, 1)', opacity: 'rgba(255, 159, 64, 0.2)' },
                { background: 'rgb(99, 255, 64)', border: 'rgb(99, 255, 64, 1)', opacity: 'rgb(99, 255, 64, 0.2)' },
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

                        console.log(data)

                        const elementData = []

                        const objectDynamicsUnitCosts = {
                            datasets: []
                        };

                        data.map((item, index) => {

                            elementData.length = 0

                            item.data.map((element) => {

                                if (element.combinedDate && !labels.includes(element.combinedDate)) {
                                    labels.push(element.combinedDate);
                                }

                                if (index === data.length - 1) {
                                    elementData.push(element.totalCostToProductivityRatio);
                                } else {
                                    elementData.push(element.costToProductivityRatio);
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
                        console.log(labels)
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

                await this.updateChartStructureKFV()

            } catch (error) {
                console.log(error)
                this.error = 'Внутренняя ошибка:' + error
            } finally {
                setTimeout(() => {
                    this.loading = false;
                }, 1000)
            }

        },

        async updateChartStructureKFV(data) {

            if (data) {

                this.dateComparisonOfTargetAndActualUnitCosts = data

            }

            if (this.dateComparisonOfTargetAndActualUnitCosts) {
                this.loadingChartStructureKFV = true
                this.errorChartStructureKFV = false

                const { breakdownType } = this.filterParams;
                let dateStart, dateEnd;

                if (breakdownType === 'year') {
                    dateStart = `${this.dateComparisonOfTargetAndActualUnitCosts}-01`;
                    dateEnd = `${this.dateComparisonOfTargetAndActualUnitCosts}-12`;
                } else if (breakdownType === 'quarter') {
                    // Validate data before calling getQuarterDates
                    if (!this.dateComparisonOfTargetAndActualUnitCosts || !/^(\d{4})-Q([1-4])$/.test(this.dateComparisonOfTargetAndActualUnitCosts)) {
                        console.error('Invalid quarter format or data is undefined:', this.dateComparisonOfTargetAndActualUnitCosts);
                        this.errorChartStructureKFV = 'Ошибка: неверный формат квартала';
                        return;
                    }
                    const { dateStartQuarter, dateEndQuarter } = this.getQuarterDates(this.dateComparisonOfTargetAndActualUnitCosts);
                    dateStart = dateStartQuarter;
                    dateEnd = dateEndQuarter;
                } else if (breakdownType === 'month') {
                    dateStart = this.dateComparisonOfTargetAndActualUnitCosts;
                    dateEnd = this.dateComparisonOfTargetAndActualUnitCosts;
                } else {
                    this.loadingChartStructureKFV = false
                    this.errorChartStructureKFV = 'Неизвестный тип разбивки'
                    return;
                }

                console.log(dateStart, dateEnd)

                const { machineClassIds, machineTypeIds } = this.filterParams;

                await TEPDataService.getComparisonOfTargetAndActualUnitCosts(dateStart, dateEnd, machineTypeIds, machineClassIds)
                    .then((response) => {

                        const data = response.data
                        console.log(data)

                        const elementData = []

                        const costTypes = []

                        const labels = []

                        const objectComparisonOfTargetAndActualUnitCosts = {
                            labels: [],
                            datasets: []
                        };

                        data.map((item, index) => {

                            item.costs.map((element) => {


                                if (element.kindName && !labels.includes(element.kindName)) {
                                    labels.push(element.kindName);
                                }
                            })

                            costTypes.push(item.type)

                        })

                        objectComparisonOfTargetAndActualUnitCosts.labels = labels

                        costTypes.forEach((type, index) => {
                            const colorIndex = index % this.colors.length;

                            objectComparisonOfTargetAndActualUnitCosts.datasets.push({
                                label: type,
                                backgroundColor: this.colors[colorIndex].opacity,
                                borderColor: this.colors[colorIndex].background,
                                pointBackgroundColor: this.colors[colorIndex].background,
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: this.colors[colorIndex].background,
                                data: []
                            });
                        });

                        data.forEach((item, index) => {

                            elementData.length = 0

                            item.costs.forEach(element => {

                                elementData.push(element.totalCost)


                            });

                            objectComparisonOfTargetAndActualUnitCosts.datasets[index].data = elementData.map(item => {
                                return item
                            })

                        });

                        console.log(objectComparisonOfTargetAndActualUnitCosts)

                        if (objectComparisonOfTargetAndActualUnitCosts.datasets.length > 0) {
                            const lastDataset = objectComparisonOfTargetAndActualUnitCosts.datasets.pop();
                            objectComparisonOfTargetAndActualUnitCosts.datasets.unshift(lastDataset);
                        }

                        if (objectComparisonOfTargetAndActualUnitCosts && Object.keys(objectComparisonOfTargetAndActualUnitCosts).length > 0) {
                            this.initialStructureKFV.labels = labels;
                            this.initialStructureKFV.datasets = objectComparisonOfTargetAndActualUnitCosts.datasets
                        } else {
                            throw new Error('Пустой объект')
                        }

                    })
                    .catch((e) => {
                        console.log('Ошибка на стороне сервера ' + e)
                        this.errorChartStructureKFV = 'Ошибка на стороне сервера ' + e
                        // this.error = 'Статус - ' + e.status
                    })
                    .finally(() => {
                        setTimeout(() => {
                            this.loadingChartStructureKFV = false
                        }, 1000)
                    })
            } else {
                this.errorChartStructureKFV = 'Ошибка: временной диапозон не выбран'
            }
        },

        getQuarterDates(quarterString) {

            const match = quarterString.match(/^(\d{4})-Q([1-4])$/);
            if (!match) {
                throw new Error(`Invalid quarter format: ${quarterString}`);
            }

            const year = parseInt(match[1], 10);
            const quarter = parseInt(match[2], 10);

            const startMonth = (quarter - 1) * 3;
            const endMonth = startMonth + 2;

            const dateStartQuarter = new Date(year, startMonth, 1);
            const dateEndQuarter = new Date(year, endMonth + 1, 0);

            return { dateStartQuarter, dateEndQuarter }

        },

        updateFilterParams(params, toggle) {
            this.$patch(state => {
                Object.assign(state.filterParams, params);
            });

            this.fetchTEP(toggle);
        }

    }
})

