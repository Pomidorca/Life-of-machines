import {
    defineStore
} from "pinia";
import {
    useAuthStore
} from "./auth";
import {
    ref
} from "vue";
import CTFDataService from "@/services/CTFDataService.js";
import {ChangeOperatingTime, ChangeOperatingTimeOptions} from "@/components/Charts/KFV/index.js";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL
export const useKFVStore = defineStore("KFV", {
    state: () => {
        return {
            loading: false,
            error: null,
            changesStructureKFV: {
                labels: [],
                datasets: []
            },
            structureKFV: {
                labels: [],
                datasets: []
            },
            filterParams: ref({
                dateStart: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10),
                dateEnd: new Date().toISOString().slice(0, 10),
                machineModelIds: [],
                machineMarkIds: [],
                machineClassIds: [],
                machineIds: [],
                machineTypeIds: [],
            }),
            initialChangeOperatingTime: ChangeOperatingTime
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
        async fetchKFV() {

            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.accessToken;
        
            if (!token) {
                this.error = "Token not found!";
                this.loading = false;
                return;
            }
            await this.filterMachines()

            const storedFilterDate = localStorage.getItem('filterDate');

            if (storedFilterDate) {

                const parsedFilterDate = JSON.parse(storedFilterDate);

                this.filterParams.dateStart = new Date(parsedFilterDate.startDate).toISOString().slice(0, 4);
                this.filterParams.dateEnd = new Date(parsedFilterDate.endDate).toISOString().slice(0, 4);
            }

            let { dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds} = this.filterParams;

            try {
                await CTFDataService.getWorkTimeByServiceLife(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {
                        // throw  new Error('Попа единорога ')

                        const data = response.data

                        const labels = []

                        const datasetsBlue = []

                        const datasetsRed = []

                        data.map((item, index) => {

                            labels.push(item.serviceLife)

                            datasetsRed.push(item.worktime)

                            datasetsBlue.push(item.worktimeAverage)
                        })

                        this.initialChangeOperatingTime.labels = labels;
                        this.initialChangeOperatingTime.datasets[0].data = datasetsBlue;
                        this.initialChangeOperatingTime.datasets[1].data = datasetsRed;

                    })
                    .catch((e) => {
                        console.log(e)
                        throw new Error(e)
                    })
                await CTFDataService.getYearly(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {
                        this.changesStructureKFV = changesStructure(response.data);
                    })
                    .catch((e) => {
                        console.log(e)
                        throw new Error(e)
                    })

                await CTFDataService.getStructure(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {
                        this.structureKFV = StructureKFV(response.data);
                    })
                    .catch((e) => {
                        console.log(e)
                        throw new Error(e)
                    })

        
            } catch (error) {
                this.error = `Error loading data: ${error.message}`;
            } finally {
                this.loading = false;
            }
        },
        updateFilterParams(params) {
            this.$patch(state => {
                Object.assign(state.filterParams, params);
            });
            this.fetchKFV();
        },
    }
})

function changesStructure(data) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error("Ошибка: Некорректные данные получены от API:", data);
        return {
            labels: [],
            datasets: []
        };
    }
    const labels = data.map(item => item.year);
    const datasets = [{
            label: "Время в работе",
            data: data.map((item) => item.fact.worktime_f),
            backgroundColor: "#497daa",
            fill: true,
        },
        {
            label: 'План. простои',
            data: data.map(item => item.fact.plannedOaTD_f + item.fact.plannedRepair_f),
            backgroundColor: '#848484',
            fill: true,
        },
        {
            label: 'Неплан.простои',
            data: data.map(item => item.fact.unplannedOaTD_f + item.fact.unplannedRepair_f),
            backgroundColor: '#325aa3',
            fill: true,
        }
    ];

    return {
        labels,
        datasets
    };
}

function StructureKFV(data) {
    if (!data || !data.fact) { 
        console.error("Ошибка: Некорректные данные получены от API:", data);
        return {
            labels: [],
            datasets: []
        };
    }

   const labels = ['Время в работе', 'Плановые простои', 'Неплановые простои'];
   const datasets = [
        {
            label: 'план',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [
                data.calculated.worktime_c, 
                data.calculated.plannedRepair_c + data.calculated.unplannedRepair_c, 
                data.calculated.plannedOaTD_c + data.calculated.unplannedOaTD_c
            ]
        },
        {
            label: 'факт',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [
                data.fact.worktime_f, 
                data.fact.plannedRepair_f + data.fact.unplannedRepair_f, 
                data.fact.plannedOaTD_f + data.fact.unplannedOaTD_f
            ]
        },
    ]

    return {
        labels,
        datasets
    };
};

