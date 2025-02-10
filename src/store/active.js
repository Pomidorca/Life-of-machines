import {
    defineStore
} from "pinia";
import {
    useAuthStore
} from "./auth";
import {
    ref
} from "vue";

/*
           Все машины = 1
           Экскаватор = 5
           Самосвал = 6 
           Автогрейдеры = 9
           Бур.Установки = 7
           Бульдозеры = 8
           Погрузчики = 10
           */
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL

export const useActiveStore = defineStore('active', {
    state: () => ({
        loading: false,
        error: null,
        lineDate: {
            labels: [],
            datasets: []
        },
        changeStructureDate: {
            labels: [],
            datasets: []
        },
        barTurnedDate: {
            labels: [],
            datasets: []
        },
        barTurnedTwoDate: {
            labels: [],
            datasets: []
        },
        filterParams: ref({
            yearStart: 2000,
            yearEnd: 2024,
            machineClassIds: 1,
            machineTypeIds: [],
        }),
    }),
    actions: {
        loadFilterParamsFromLocalStorage() {
            const storedFilterDate = localStorage.getItem('filterDate');
            const storedClassTechnique = localStorage.getItem('TypeTechnique');

            if (storedFilterDate) {
                try {
                    const parsedFilterDate = JSON.parse(storedFilterDate);
                    const startYear = parsedFilterDate.startDate = new Date(parsedFilterDate.startDate).getFullYear();
                    const endYear = parsedFilterDate.endDate = new Date(parsedFilterDate.endDate).getFullYear();
                    this.filterParams.yearStart = startYear || this.filterParams.yearStart;
                    this.filterParams.yearEnd = endYear || this.filterParams.yearEnd;
                } catch (error) {
                    console.error("Ошибка при загрузке состояния из localStorage:", error);
                }
            }

            if (storedClassTechnique) {
                try {
                    const parsedTypeTechnique = JSON.parse(storedClassTechnique);
                    this.filterParams.machineClassIds = parsedTypeTechnique.selectedTechniqueId || this.filterParams.machineClassIds;
                } catch (error) {
                    console.error("Ошибка при загрузке состояния из localStorage:", error);
                }
            }

        },
        async fetchData() {
            this.loadFilterParamsFromLocalStorage();
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.accessToken;

            if (!token) {
                this.error = 'Токен не найден!';
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
                const responses = await Promise.all([
                    fetch(`${API_BASE_URL}/actives/charts/structure?yearStart=${yearStart}&yearEnd=${yearEnd}&machineClassIds=${machineClassIds}&machineTypeIds=${machineTypeIds}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }),
                    fetch(`${API_BASE_URL}/actives/charts/average-age?yearStart=${yearStart}&yearEnd=${yearEnd}&machineClassIds=${machineClassIds}&machineTypeIds=${machineTypeIds}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }),
                    fetch(`${API_BASE_URL}/actives/charts/work-distribution?yearStart=${yearStart}&yearEnd=${yearEnd}&machineClassIds=${machineClassIds}&machineTypeIds=${machineTypeIds}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }),
                    fetch(`${API_BASE_URL}/actives/charts/count-and-average-age?yearStart=${yearStart}&yearEnd=${yearEnd}&machineClassIds=${machineClassIds}&machineTypeIds=${machineTypeIds}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }),
                    fetch(`${API_BASE_URL}/actives/machine-list?&machineClassIds=${machineClassIds}&machineTypeIds=${machineTypeIds}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }),
                ]);

                const data = await Promise.all(responses.map(res => res.json()));


                this.lineDate = transformLinedate(data[0]);
                this.changeStructureDate = transformchangeStructuredate(data[1]);
                this.barTurnedTwoDate = transformbarTurnedTwoDate(data[2]);
                this.barTurnedDate = transformbarTurnedDate(data[3]);

            } catch (error) {
                this.error = `Ошибка при загрузке данных: ${error.message}`;
                console.error("Ошибка при получение данных:", error);
            } finally {
                this.loading = false;
            }
        },
        updateFilterParams(params) {
            this.$patch(state => {
                Object.assign(state.filterParams, params);
            });
            this.fetchData();
        },

    }
})

function transformLinedate(data) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error("Ошибка: Некорректные данные получены от API:", data);
        return {
            labels: [],
            datasets: []
        };
    }
    const labels = data.map(item => item.year);
    const stackedDatasets = [
        {
            label: 'Основное',
            data: data.map(item => item.main),
            borderColor: '#31608c',
            backgroundColor: '#31608c',
            fill: true,
            stack: 'stack0'
        },
        {
            label: 'Поддерживающее',
            data: data.map(item => item.support),
            borderColor: '#3c6f9f',
            backgroundColor: '#3c6f9f',
            fill: true,
            stack: 'stack0'
        },
        {
            label: 'Вспомогательное',
            data: data.map(item => item.auxiliary),
            borderColor: '#7e9abf',
            backgroundColor: '#7e9abf',
            fill: true,
            stack: 'stack0'
        }
    ].filter(dataset => dataset.data.some(value => value !== 0));


    const totalDataset = {
        label: 'Итого',
        data: data.map(item => item.main + item.support + item.auxiliary),
        borderColor: '#0554F2',
        pointStyle: 'circle',
        backgroundColor: '#282b41',
        pointBorderColor: '#282b41',
        fill: false,
    };

    if (totalDataset.data.every(value => value === 0)) {
        return {
            labels: [],
            datasets: []
        };
    }

    return {
        labels,
        datasets: [totalDataset, ...stackedDatasets ]
    };
}

function transformchangeStructuredate(data) {
    if (!data || data.length === 0) {
        console.error("Ошибка: Некорректные данные получены от API:", data);
        return {
            labels: [],
            datasets: []
        };
    }
    const labels = data.map(item => item.year);
    const datasets = [{
            label: 'Основное',
            data: data.map(item => item.main),
            backgroundColor: '#4078b0',
            borderColor: '#4078b0',
            borderWidth: 1
        },
        {
            label: 'Поддерживающее',
            data: data.map(item => item.support),
            backgroundColor: '#848484',
            borderColor: '#848484',
            borderWidth: 1
        },
        {
            label: 'Вспомогательное',
            data: data.map(item => item.auxiliary),
            backgroundColor: '#325aa3',
            borderColor: '#325aa3',
            borderWidth: 1
        },
    ].filter(dataset => dataset.data.some(value => value !== 0));


    return {
        labels,
        datasets
    }
}

function transformbarTurnedTwoDate(data) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return {
            labels: [],
            datasets: []
        };
    }
    const labels = data.map(item => item.workType);
    const datasets = [{
            label: [data.map(item => item.workType)],
            data: data.map(item => item.count),
            backgroundColor: '#4078b0',
            borderColor: '#4078b0',
            borderWidth: 1
        },

    ].filter(dataset => dataset.data.some(value => value !== 0));


    return {
        labels,
        datasets
    };
}

function transformbarTurnedDate(data) {
    const labels = ['Добычные работы', 'Вскрышные работы', 'Дополнительные работы'];
    const datasets = [{
            label: 'Средний срок службы',
            data: [data.mainAvgAge, data.supportAvgAge, data.auxiliaryAvgAge],
            backgroundColor: '#4078b0',
            borderColor: '#4078b0',
            borderWidth: 1
        },
        {
            label: 'Количество',
            data: [data.mainCount, data.supportCount, data.auxiliaryCount],
            backgroundColor: '#7e9abf',
            borderColor: '#7e9abf',
            borderWidth: 1
        }
    ].filter(dataset => dataset.data.some(value => value !== 0));



    return {
        labels,
        datasets
    };
}