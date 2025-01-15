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
import { ChangeOperatingTime } from "@/components/Charts/KFV/index.js";

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
                yearStart: 2000,
                yearEnd: 2024,
                machineClassIds: 1,
                machineTypeIds: [],
            }),
            initialChangeOperatingTime: ChangeOperatingTime
        }
    },
    actions: {
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
        
            const { yearStart, yearEnd, machineClassIds, machineTypeIds } = this.filterParams; 
        
            try {
                await CTFDataService.getWorkTimeByServiceLife(yearStart, yearEnd)
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
                    })

                const responses = await Promise.all([
                    fetch(`${API_BASE_URL}/ctf/charts/yearly?dateStart=${yearStart}&dateEnd=${yearEnd}&machineClassIds=${machineClassIds}&machineTypeIds=${machineTypeIds}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    fetch(`${API_BASE_URL}/ctf/charts/structure?dateStart=${yearStart}&dateEnd=${yearEnd}&machineClassIds=${machineClassIds}&machineTypeIds=${machineTypeIds}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                ]);
        
                for (const response of responses) {
                    if (!response.ok) {
                        const text = await response.text();
                        throw new Error(`HTTP error ${response.status}: ${text}`);
                    }
                }
        
                const data = await Promise.all(responses.map(res => res.json()));
        
                console.log("Полученные данные", data);
        
                this.changesStructureKFV = changesStructure(data[0]);
                this.structureKFV = StructureKFV(data[1]);

        
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

    console.log("Проверка datasets:", datasets.map(dataset => ({
        label: dataset.label,
        data: dataset.data
    })));

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
            label: 'calc',
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
            label: 'fact',
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

    console.log("Проверка datasets:", datasets.map(dataset => ({
        label: dataset.label,
        data: dataset.data
    })));

    return {
        labels,
        datasets
    };
};

