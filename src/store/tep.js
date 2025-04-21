import {
    defineStore
} from "pinia";
import {ref} from "vue";
import {
    CarryingOutVolumes,
    CostStructure, DynamicsSpecificAccumulated,
    DynamicsUnitCosts, DynamicsUnitCostsThree,
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
                machineModelIds: [],
                machineMarkIds: [],
                machineClassIds: [],
                machineIds: [],
                machineTypeIds: [],
            }),
            initialCarryingOutVolumes: CarryingOutVolumes,
            initialDynamicsUnitCosts: DynamicsUnitCosts,
            initialDynamicsUnitCostsTwo: DynamicsUnitCostsTwo,
            initialStructureKFV: StructureKFV,
            initialCostStructure: CostStructure,
            initialDynamicsSpecificAccumulated: DynamicsSpecificAccumulated,
            initialDynamicsUnitCostsThree: DynamicsUnitCostsThree,
            colors: [
                { background: 'rgba(255, 99, 132, 1)', border: 'rgba(255, 99, 132, 1)', opacity: 'rgba(255, 99, 132, 0.2)', secondBg: 'rgb(161,35,59)'},
                { background: 'rgba(54, 162, 235, 1)', border: 'rgba(54, 162, 235, 1)', opacity: 'rgba(54, 162, 235, 0.2)', secondBg: 'rgb(37,105,161)' },
                { background: 'rgba(255, 206, 86, 1)', border: 'rgba(255, 206, 86, 1)', opacity: 'rgba(255, 206, 86, 0.2)', secondBg: 'rgb(175,142,59)'},
                { background: 'rgba(75, 192, 192, 1)', border: 'rgba(75, 192, 192, 1)', opacity: 'rgba(75, 192, 192, 0.2)', secondBg: 'rgb(62,161,161)' },
                { background: 'rgba(153, 102, 255, 1)', border: 'rgba(153, 102, 255, 1)', opacity: 'rgba(153, 102, 255, 0.2)', secondBg: 'rgb(82,52,135)' },
                { background: 'rgba(255, 159, 64, 1)', border: 'rgba(255, 159, 64, 1)', opacity: 'rgba(255, 159, 64, 0.2)', secondBg: 'rgb(142,92,39)' },
                { background: 'rgb(99, 255, 64)', border: 'rgb(99, 255, 64, 1)', opacity: 'rgb(99, 255, 64, 0.2)', secondBg: 'rgb(56,143,37)' },
            ]
        }
    },
    actions: {

        filterMachines() {
            const machineModelIds = localStorage.getItem('selectedMachineModelIds');
            const machineMarkIds = localStorage.getItem('selectedMachineMarkIds');
            const machineClassIds = localStorage.getItem('selectedMachineClassIds');
            const machineIds = localStorage.getItem('selectedMachineIds');
            let machineTypeIds = localStorage.getItem('selectedMachineTypeIds');

            let classIds;

            if (machineClassIds && JSON.parse(machineClassIds).length > 0) {

                classIds = JSON.parse(machineClassIds);
            } else if (machineTypeIds) {

                if (Array.isArray(JSON.parse(machineTypeIds))) {

                    classIds = JSON.parse(machineTypeIds);
                } else {

                    classIds = [JSON.parse(machineTypeIds)];
                }
            } else {

                classIds = [1];
            }

            this.$patch(state => {
                state.filterParams.machineModelIds = machineModelIds ? JSON.parse(machineModelIds) : [];
                state.filterParams.machineMarkIds = machineMarkIds ? JSON.parse(machineMarkIds) : [];
                state.filterParams.machineClassIds = classIds;
                state.filterParams.machineIds = machineIds ? JSON.parse(machineIds) : [];
            });
        },

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

                await this.filterMachines()

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

                const { dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds } = this.filterParams;

                await TEPDataService.getVolumeFulfillmentExtraction( dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds)
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
                        if (e.response && e.response.status === 404) {

                            this.initialCarryingOutVolumes.datasets.forEach(dataset => dataset.data = []);
                        } else {
                            console.log('Ошибка на стороне сервера ' + e);

                        }
                    })

                await TEPDataService.getMonthlyParkProductivity( dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds)
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
                            if(item.markName) {
                                costTypes.push(item.markName)
                            } else {
                                costTypes.push(item.machineClassName)
                            }

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
                        if (e.response && e.response.status === 404) {

                            this.initialDynamicsUnitCosts.datasets.forEach(dataset => dataset.data = []);
                        } else {
                            console.log('Ошибка на стороне сервера ' + e);

                        }
                    })

                await TEPDataService.getDinamicsUnitCosts( dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {

                        const labels = []

                        const data = response.data

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

                        if (objectDynamicsUnitCosts.datasets.length > 0) {
                            const lastDataset = objectDynamicsUnitCosts.datasets.pop();
                            objectDynamicsUnitCosts.datasets.unshift(lastDataset);

                            const targetObject = objectDynamicsUnitCosts.datasets.find(item => item.label === 'Total');
                            if (targetObject) {
                                targetObject.label = 'Общий';
                            }

                        }

                        if (objectDynamicsUnitCosts && Object.keys(objectDynamicsUnitCosts).length > 0) {
                            this.initialDynamicsUnitCostsTwo.labels = labels;
                            this.initialDynamicsUnitCostsTwo.datasets = objectDynamicsUnitCosts.datasets
                        } else {
                            throw new Error('Пустой объект')
                        }

                    })
                    .catch((e) => {
                        if (e.response && e.response.status === 404) {

                            this.initialDynamicsUnitCostsTwo.datasets.forEach(dataset => dataset.data = []);
                        } else {
                            console.log('Ошибка на стороне сервера ' + e);
                            this.error = 'Ошибка на стороне сервера ' + e
                        }
                    })

                await TEPDataService.getStructureOfEquipmentOwnershipCosts( dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds )
                    .then((response) => {

                        if (!response.data) {
                            console.error('Данные отсутствуют');
                            return;
                        }

                        const data = response.data;

                        const costStructure = {
                            labels: [],
                            datasets: []
                        };

                        data.forEach((item) => {
                            costStructure.labels.push(item.markName);
                        });

                        const uniqueCostTypes = [...new Set(data.flatMap(item => item.data.map(element => element.type)))];


                        const totalCostIndex = uniqueCostTypes.findIndex(type => type.includes('ИТОГО удельные затраты на владение'));

                        if (totalCostIndex !== -1) {

                            const totalCostType = uniqueCostTypes.splice(totalCostIndex, 1)[0];


                            uniqueCostTypes.unshift(totalCostType);
                        }

                        uniqueCostTypes.forEach((costType, index) => {
                            const colorIndex = index % this.colors.length;

                            const dataset = {
                                label: costType,
                                data: data.map(item => {
                                    const cost = item.data.find(element => element.type === costType);
                                    return cost ?
                                        (costType.includes('ИТОГО') ? cost.totalCost :
                                            costType.includes('Удельная стоимость') ? cost.specificCost :
                                                costType.includes('ТО, ТР') ? cost.maintenanceAndRepairCosts :
                                                    costType.includes('ФОТ и налоги') ? cost.laborAndTaxesCosts :
                                                        costType.includes('эксплуатацию') ? cost.fuelCosts :
                                                            costType.includes('Прочее') ? cost.otherCosts : 0)
                                        : 0;
                                }),
                                backgroundColor: this.colors[colorIndex].background,
                                borderColor: '',
                            };

                            if (costType.includes('ИТОГО удельные затраты на владение')) {
                                dataset.backgroundColor = '#33538f';
                                dataset.borderColor = '#33538f';
                                dataset.type = 'line';
                            }

                            costStructure.datasets.push(dataset);
                        });

                        this.initialCostStructure.labels = costStructure.labels;
                        this.initialCostStructure.datasets = costStructure.datasets;

                    })
                    .catch((e) => {
                        if (e.response && e.response.status === 404) {
                            this.initialCostStructure.labels = [];
                            this.initialCostStructure.datasets = [];
                        } else {
                            console.log('Ошибка на стороне сервера ' + e);
                            this.error = 'Ошибка на стороне сервера ' + e;
                        }
                    });

                await TEPDataService.getDynamicsOfUnitAccumulatedCosts( dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds )
                    .then((response) => {

                        if (!response.data) {
                            console.error('Данные отсутствуют');
                            return;
                        }

                        const data = response.data;
                        console.log(data)
                        const labels = Array.from(new Set(data.flatMap(item => item.data.map(d => d.combinedDate)))).sort((a, b) => a - b);

                        const graphData = {
                            labels: labels,
                            datasets: []
                        };

                        data.forEach((machine, index) => {

                            const colorIndex = index % this.colors.length;

                            graphData.datasets.push({
                                label: `Уд. нак. затрат ${machine.markName}`,
                                data: labels.map(combinedDate => {
                                    const yearData = machine.data.find(d => d.combinedDate === combinedDate);
                                    return yearData ? yearData.productivity : 0;
                                }),
                                backgroundColor: this.colors[colorIndex].secondBg,
                                borderColor: this.colors[colorIndex].secondBg,
                                yAxisID: 'y-cost'
                            });


                            graphData.datasets.push({
                                label: `Производ. ${machine.markName}`,
                                data: labels.map(combinedDate => {
                                    const yearData = machine.data.find(d => d.combinedDate === combinedDate);
                                    return yearData ? yearData.costToProductivityRatio : 0;
                                }),
                                backgroundColor: this.colors[colorIndex].background,
                                borderColor: this.colors[colorIndex].border,
                                yAxisID: 'y-costTwo',
                            });
                        });

                        this.initialDynamicsSpecificAccumulated.labels = graphData.labels
                        this.initialDynamicsSpecificAccumulated.datasets = graphData.datasets

                        })
                    .catch((e) => {
                        if (e.response && e.response.status === 404) {
                            this.initialDynamicsSpecificAccumulated.labels = [];

                        } else {
                            console.log('Ошибка на стороне сервера ' + e);
                            this.error = 'Ошибка на стороне сервера ' + e;
                        }
                    })

                    await TEPDataService.getDynamicsOfUnitAccumulatedCostsWithIndustryReplacement(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {
                        if (!response.data) {
                            console.error('Данные отсутствуют');
                            return;
                        }
                
                        const data = response.data;
                
                        let maxLength = 0;
                        data.forEach(item => {
                            if (item.data && Array.isArray(item.data) && item.data.length > maxLength) {
                                maxLength = item.data.length;
                            }
                        });
                
                        const labels = Array.from({ length: maxLength }, (_, i) => i + 1);
                
                        const graphData = {
                            labels: labels,
                            datasets: []
                        };
                
                        data.forEach((item, index) => {

                            if (!item.data || !Array.isArray(item.data) || item.data.length === 0) {
                                return;
                            }
                
                            const colorIndex = index % this.colors.length;
                
                            if (item.machineId) {
                                graphData.datasets.push({
                                    label: `Уд. нак. затрат ${item.markName}`,
                                    data: item.data.map(d => d.costToProductivityRatio),
                                    backgroundColor: this.colors[colorIndex].opacity,
                                    borderColor: this.colors[colorIndex].border,
                                    type: 'line'
                                });
                            } else if (item.markId) {
                                graphData.datasets.push({
                                    label: `Средний отраслевой уровень Уд. нак. затрат ${item.markName}`,
                                    data: item.data.map(d => d.costToProductivityRatio),
                                    borderDash: [10, 10],
                                    backgroundColor: this.colors[colorIndex].background,
                                    borderColor: this.colors[colorIndex].border,
                                    type: 'line'
                                });
                            }
                        });
                
                        this.initialDynamicsUnitCostsThree.labels = graphData.labels;
                        this.initialDynamicsUnitCostsThree.datasets = graphData.datasets;
                    })
                    .catch((e) => {
                        if (e.response && e.response.status === 404) {
                            this.initialDynamicsUnitCostsThree.labels = [];
                            this.initialDynamicsUnitCostsThree.datasets = [];
                        } else {
                            console.log('Ошибка на стороне сервера ' + e);
                            this.error = 'Ошибка на стороне сервера' + e;
                        }
                    });


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

                const { breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds } = this.filterParams;
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

                await TEPDataService.getComparisonOfTargetAndActualUnitCosts(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {

                        const data = response.data

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
                    .catch((error) => {
                        if (error.response && error.response.status === 404) {

                            // this.initialStructureKFV.labels = [];
                            this.initialStructureKFV.datasets.forEach(dataset => dataset.data = []);
                            // this.errorChartStructureKFV = 'Данные не найдены (404)';
                        } else {
                            console.log('Ошибка на стороне сервера ' + error);
                            this.errorChartStructureKFV = 'Ошибка на стороне сервера ' + error;

                        }
                    })
                    .finally(() => {
                        setTimeout(() => {
                            this.loadingChartStructureKFV = false
                        }, 1000)
                    })
            } else {
                this.errorChartStructureKFV = 'Временной диапозон не выбран.'
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

