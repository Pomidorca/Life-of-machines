import { defineStore } from "pinia";
import {useAuthStore} from "@/store/auth.js";
import TOIRDataService from "@/services/TOIRDataService.js";
import {useMachineStore} from "@/store/machine.js";
import {
    ActualAccidentRate,
    NumberOfBreakdownsByFaultName,
    NumberOfBreakdownsByFaultNameOptions,
    NumberOfRefunds,
    NumberOfRefundsOptions,
    OrganizationOfRepairs,
    OrganizationOfRepairsOptionsSecond,
    OrganizationOfRepairsSecond,
    TotalEmergencyDowntime,
    WorkPlanningIndicator
} from "@/components/Charts/TOiR/index.js";

export const useTOIRStore = defineStore("TOIR", {
    state: () => {
        return {
            loading: false,
            error: false,
            filterParams: {
                dateStart: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10),
                dateEnd: new Date().toISOString().slice(0, 10),
                breakdownType: null,
                machineModelIds: [],
                machineMarkIds: [],
                machineClassIds: [],
                machineIds: [],
                machineTypeIds: [],
            },
            breakdownsChartHeight: 400,
            initialNumberOfRefunds: NumberOfRefunds,
            initialNumberOfRefundsOptions: NumberOfRefundsOptions,
            initialOrganizationOfRepairs: OrganizationOfRepairs,
            initialOrganizationOfRepairsSecond: OrganizationOfRepairsSecond,
            initialOrganizationOfRepairsOptionsSecond: OrganizationOfRepairsOptionsSecond,
            initialActualAccidentRate: ActualAccidentRate,
            initialWorkPlanningIndicator: WorkPlanningIndicator,
            initialTotalEmergencyDowntime: TotalEmergencyDowntime,
            initialNumberOfBreakdownsByFaultName: NumberOfBreakdownsByFaultName,
            initialNumberOfBreakdownsByFaultNameOptions: NumberOfBreakdownsByFaultNameOptions,
            colors: [
                { background: 'rgba(255, 99, 132, 1)', border: 'rgba(255, 99, 132, 1)', opacity: 'rgba(255, 99, 132, 0.2)', secondBg: 'rgb(161,35,59)'},
                { background: 'rgba(54, 162, 235, 1)', border: 'rgba(54, 162, 235, 1)', opacity: 'rgba(54, 162, 235, 0.2)', secondBg: 'rgb(37,105,161)' },
                { background: 'rgba(255, 206, 86, 1)', border: 'rgba(255, 206, 86, 1)', opacity: 'rgba(255, 206, 86, 0.2)', secondBg: 'rgb(175,142,59)'},
                { background: 'rgba(75, 192, 192, 1)', border: 'rgba(75, 192, 192, 1)', opacity: 'rgba(75, 192, 192, 0.2)', secondBg: 'rgb(62,161,161)' },
                { background: 'rgba(153, 102, 255, 1)', border: 'rgba(153, 102, 255, 1)', opacity: 'rgba(153, 102, 255, 0.2)', secondBg: 'rgb(82,52,135)' },
                { background: 'rgba(255, 159, 64, 1)', border: 'rgba(255, 159, 64, 1)', opacity: 'rgba(255, 159, 64, 0.2)', secondBg: 'rgb(142,92,39)' },
                { background: 'rgb(99, 255, 64)', border: 'rgb(99, 255, 64, 1)', opacity: 'rgb(99, 255, 64, 0.2)', secondBg: 'rgb(56,143,37)' },
            ],
            colorsSecond: [
                { background: 'rgb(133,255,99)', border: 'rgb(156,255,99)', opacity: 'rgba(138,255,99,0.2)', secondBg: 'rgb(71,161,35)'},
                { background: 'rgb(54,235,202)', border: 'rgb(54,235,214)', opacity: 'rgba(54, 162, 235, 0.2)', secondBg: 'rgb(37,161,138)' },
                { background: 'rgb(255,117,86)', border: 'rgb(255,106,86)', opacity: 'rgba(255,117,86,0.2)', secondBg: 'rgb(175,80,59)'},
                { background: 'rgb(171,75,192)', border: 'rgb(159,75,192)', opacity: 'rgba(145,75,192,0.2)', secondBg: 'rgb(128,62,161)' },
                { background: 'rgba(153, 102, 255, 1)', border: 'rgba(153, 102, 255, 1)', opacity: 'rgba(153, 102, 255, 0.2)', secondBg: 'rgb(82,52,135)' },
                { background: 'rgb(64,188,255)', border: 'rgb(64,198,255)', opacity: 'rgba(64,220,255,0.2)', secondBg: 'rgb(39,111,142)' },
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
        async fetchData(toggle) {

            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.accessToken;

            if (!token) {
                this.error = "Token not found!";
                this.loading = false;
                return;
            }

            const storedFilterDate = localStorage.getItem('filterDate');

            if (storedFilterDate) {

                const parsedFilterDate = JSON.parse(storedFilterDate);

                console.log(parsedFilterDate)

                this.filterParams.dateStart = new Date(parsedFilterDate.startDate).toISOString().slice(0, 10);
                this.filterParams.dateEnd = new Date(parsedFilterDate.endDate).toISOString().slice(0, 10);

                console.log(this.filterParams)
            }

            await this.filterMachines()

            const machineStore = useMachineStore();

            this.filterParams.machineTypeIds = machineStore.selectedMachineTypeIds;

            if (toggle) {
                this.filterParams.breakdownType = toggle
            }

            const { dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds, breakdownType, level } = this.filterParams

            try {

                await TOIRDataService.getIndicatorOfOrganizationOfRepairs(dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {
                        const data = response.data;
                        const labels = [];
                        const coefficients = [];
                        const differences = [];

                        data.forEach(item => {
                            if (!labels.includes(item.combinedDate)) {
                                labels.push(item.combinedDate);
                            }
                            coefficients.push(item.coefficient);
                            differences.push( 1 - item.coefficient );
                        });

                        this.initialActualAccidentRate.labels = labels;

                        this.initialActualAccidentRate.datasets[1].data = differences;

                        this.initialActualAccidentRate.datasets[0].data = coefficients;

                    })
                    .catch((e) => {
                        throw new Error(e)
                    })
                await TOIRDataService.getTheWorkPlanningIndicator(dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {

                        const data = response.data;
                        const labels = [];
                        const coefficients = [];
                        const differences = [];

                        data.forEach(item => {
                            if (!labels.includes(item.combinedDate)) {
                                labels.push(item.combinedDate);
                            }
                            coefficients.push(item.coefficient);
                            differences.push( 1 - item.coefficient );
                        });

                        this.initialOrganizationOfRepairs.labels = labels;

                        this.initialOrganizationOfRepairs.datasets[1].data = differences;

                        this.initialOrganizationOfRepairs.datasets[0].data = coefficients;

                    })
                    .catch((e) => {
                        console.log(e)
                    })

                await TOIRDataService.getEmergencyDowntime(dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {
                        const data = response.data

                        const labelsSet = new Set();
                        const datasetsMap = new Map();

                        data.forEach(item => {
                            item.data.forEach(el => {
                                labelsSet.add(el.combinedDate);
                            });
                        });

                        const labels = Array.from(labelsSet).sort();

                        data.forEach((item, index) => {
                            const labelKey = item.markName || item.machineClassName;
                            const colorIndex = index % this.colors.length;

                            const dataset = {
                                label: labelKey,
                                data: new Array(labels.length).fill(null),
                                backgroundColor: this.colors[colorIndex].background,
                                borderColor: this.colors[colorIndex].border,
                                fill: false,
                                tension: 0.1
                            };

                            item.data.forEach(el => {
                                const dateIndex = labels.indexOf(el.combinedDate);
                                if (dateIndex !== -1) {
                                    dataset.data[dateIndex] = el.unplannedRepair;
                                }
                            });

                            datasetsMap.set(labelKey, dataset);
                        });

                        this.initialWorkPlanningIndicator.labels = labels;
                        this.initialWorkPlanningIndicator.datasets = Array.from(datasetsMap.values());

                    })
                    .catch((e) => {
                        throw new Error(e)
                    })
                await TOIRDataService.getTotalAverageRepairTime(dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {
                        const data = response.data

                        const labelsSet = new Set();
                        const datasetsMap = new Map();

                        data.forEach(item => {
                            item.data.forEach(el => {
                                labelsSet.add(el.combinedDate);
                            });
                        });

                        const labels = Array.from(labelsSet).sort();

                        data.forEach((item, index) => {
                            const labelKey = item.markName || item.machineClassName;
                            const colorIndex = index % this.colors.length;

                            const dataset = {
                                label: labelKey,
                                data: new Array(labels.length).fill(null),
                                backgroundColor: this.colorsSecond[colorIndex].background,
                                borderColor: this.colorsSecond[colorIndex].border,
                                fill: false,
                                tension: 0.1
                            };

                            item.data.forEach(el => {
                                const dateIndex = labels.indexOf(el.combinedDate);
                                if (dateIndex !== -1) {
                                    dataset.data[dateIndex] = el.averageRepairTime;
                                }
                            });

                            datasetsMap.set(labelKey, dataset);
                        });

                        this.initialTotalEmergencyDowntime.labels = labels;
                        this.initialTotalEmergencyDowntime.datasets = Array.from(datasetsMap.values());

                    })
                    .catch((e) => {
                        throw new Error(e)
                    })

                await TOIRDataService.getTheNumberOfSubsystemFailures(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {
                        const data = response.data

                        const labelsSet = new Set();
                        const datasetsMap = new Map();
                        const allValues = [];

                        data.forEach(item => {
                            labelsSet.add(item.subAssembly)
                        })

                        const labels = Array.from(labelsSet)

                        data.forEach((item, index) => {
                            const labelKey = item.subAssembly;
                            const colorIndex = index % this.colors.length;

                            const dataset = {
                                label: labelKey,
                                data: new Array(labels.length).fill(null),
                                backgroundColor: 'rgb(32,81,174)',
                                borderColor: 'rgb(32,81,174)',
                                fill: false,
                                tension: 0.1
                            };

                            const labelIndex = labels.indexOf(item.subAssembly);

                            if (labelIndex !== -1) {
                                dataset.data[labelIndex] = item.failurescount;
                                allValues.push(item.failurescount);
                            }

                            datasetsMap.set(labelKey, dataset);
                        });

                        const maxValue = allValues.length > 0 ? Math.max(...allValues) : 1;
                        const yBorder = maxValue * 1.2

                        this.initialNumberOfRefunds.labels = labels
                        this.initialNumberOfRefunds.datasets = Array.from(datasetsMap.values());
                        this.initialNumberOfRefundsOptions.scales.y.max = yBorder

                    })
                    .catch((e) => {
                        throw new Error(e)
                    })

                await TOIRDataService.getBreakdownCountsByFaultName(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {
                        const data = response.data
                        const labelsSet = new Set();
                        const datasetsMap = new Map();
                        const allValues = [];

                        data.forEach(item => {
                            labelsSet.add(item.faultName)
                        })

                        const labels = Array.from(labelsSet)

                        data.forEach((item, index) => {
                            const labelKey = item.faultName;

                            const dataset = {
                                label: labelKey,
                                data: new Array(labels.length).fill(null),
                                backgroundColor: 'rgb(32,81,174)',
                                borderColor: 'rgb(32,81,174)',
                                fill: false,
                                tension: 0.1
                            };

                            const labelIndex = labels.indexOf(item.faultName);

                            if (labelIndex !== -1) {
                                dataset.data[labelIndex] = item.failurescount;
                                allValues.push(item.failurescount);
                            }

                            datasetsMap.set(labelKey, dataset);
                        });

                        const maxValue = allValues.length > 0 ? Math.max(...allValues) : 1;
                        const yBorder = maxValue * 1.2

                        const baseHeightPerLabel = 30;
                        const minHeight = 400;
                        const calculatedHeight = Math.max(minHeight, labels.length * baseHeightPerLabel);

                        this.breakdownsChartHeight = calculatedHeight;

                        this.initialNumberOfBreakdownsByFaultName.labels = labels
                        this.initialNumberOfBreakdownsByFaultName.datasets = Array.from(datasetsMap.values());
                        this.initialNumberOfBreakdownsByFaultNameOptions.scales.x.max = yBorder
                        console.log(data)

                    })
                    .catch((e) => {
                        throw new Error(e)
                    })
                await TOIRDataService.getCountRequiredSpareParts(dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {
                        const data = response.data
                        console.log('getCountRequiredSpareParts МОЙ', response.data)
                        const labelsSet = new Set();
                        const datasets = []
                        console.log(data[0].data)
                        data[0].data[0].data.forEach(item => {
                            console.log(item.requiredSparePartsCount.count)
                            labelsSet.add(item.breakdownGroupName)
                            if (item.requiredSparePartsCount.count) {
                                datasets.push(item.requiredSparePartsCount.count || 0)
                            }
                        })

                        const labels = Array.from(labelsSet)
                        console.log('labels', labels)
                        this.initialOrganizationOfRepairsSecond.labels = labels;
                        this.initialOrganizationOfRepairsSecond.datasets[0].data = datasets;
                        const machineName = data[0].data[0].markName || 'Без названия';
                        this.initialOrganizationOfRepairsOptionsSecond.plugins.title.text = 'Страховой объем запасных частей, шт ' + `( ${machineName} )`
                        console.log(machineName)
                        // this.initialOrganizationOfRepairsOptionsSecond = getOrganizationOfRepairsOptionsSecond(machineName);

                    })
                    .catch((e) => {
                        throw new Error(e)
                    })

            } catch (e) {
                console.log(e)
                this.error = e
            } finally {
                setTimeout(() => {
                    this.loading = false
                }, 3000)
            }
        },
        updateFilterParams(params, toggle) {
            this.$patch(state => {
                Object.assign(state.filterParams, params);

            });
            this.fetchData(toggle);
        }

    }
})
