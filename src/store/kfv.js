import {
    defineStore
} from "pinia";
import {
    useAuthStore
} from "./auth";
import {
    ref
} from "vue";

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
            filterParams: ref({
                yearStart: 2000,
                yearEnd: 2024,
                machineClassIds: 1,
                machineTypeIds: [],
            })
        }
    },
    actions: {
        async fetchKFV() {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.accessToken;

            if (!token) {
                this.error = "Токен не найден!";
                this.loading = false;
                return;
            }

            const {
                yearStart,
                yearEnd,
                machineClassIds,
                machineTypeIds
            } = this.filterParams;

            try {
                const response = await fetch(`${API_BASE_URL}/ctf/charts/yearly?dateStart=${yearStart}&dateEnd=${yearEnd}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`HTTP error ${response.status}: ${text}`);
                }

                const data = await response.json();

                console.log("Полученные данные", data);

                this.changesStructureKFV = changesStructure(data);

            } catch (error) {
                this.error = `Ошибка при загрузке данных ${error.message}`;
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
