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
export const useActiveStore = defineStore('active', {
    state: () => ({
        loading: false,
        error: null,
        lineDate: ref({
            labels: [],
            datasets: []
        }),
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
    }),
    actions: {
        async fetchData(filterParams) {
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
                yearStart = 2000, yearEnd = 2024, machineClassIds = 1, machineTypeIds = ''
            } = filterParams || {};
            try {
                const responses = await Promise.all([
                    fetch(`http://localhost:3000/actives/charts/structure?yearStart=${yearStart}&yearEnd=${yearEnd}&machineClassIds=${machineClassIds}&${machineTypeIds}=`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }),
                    fetch(`http://localhost:3000/actives/charts/average-age?yearStart=${yearStart}&yearEnd=${yearEnd}&machineClassIds=${machineClassIds}&${machineTypeIds}=`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }),
                    fetch(`http://localhost:3000/actives/charts/work-distribution?yearStart=${yearStart}&yearEnd=${yearEnd}&machineClassIds=${machineClassIds}&${machineTypeIds}=`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }),
                    fetch(`http://localhost:3000/actives/charts/count-and-average-age?yearStart=${yearStart}&yearEnd=${yearEnd}&machineClassIds=${machineClassIds}&${machineTypeIds}=`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }),
                    fetch(`http://localhost:3000/actives/machine-list?&machineClassIds=${machineClassIds}&machineTypeIds=`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }),
                ]);

                const data = await Promise.all(responses.map(res => res.json()));
                console.log('Все данные:', data);


                this.lineDate = transformLinedate(data[0]);
                this.changeStructureDate = transformchangeStructuredate(data[1]);
                this.barTurnedTwoDate = transformbarTurnedTwoDate(data[2]);
                this.barTurnedDate = transformbarTurnedDate(data[3]);
                console.log('Данные после transformLinedate:', this.lineDate.value);

            } catch (error) {
                this.error = `Ошибка при загрузке данных: ${error.message}`;
                console.error("Error fetching data:", error);
            } finally {
                this.loading = false;
            }
        }

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
    const datasets = [{
            label: 'Основное',
            data: data.map(item => item.main),
            borderColor: '#31608c',
            backgroundColor: '#31608c',
            fill: true,
        },
        {
            label: 'Поддерживающее',
            data: data.map(item => item.support),
            borderColor: '#3c6f9f',
            backgroundColor: '#3c6f9f',
            fill: true,
        },
        {
            label: 'Вспомогательное',
            data: data.map(item => item.auxiliary),
            borderColor: '#7e9abf',
            backgroundColor: '#7e9abf',
            fill: true,
        },
        {
            label: 'Итого',
            data: data.map(item => item.main + item.support + item.auxiliary),
            borderColor: '#0554F2',
            pointStyle: 'circle',
            backgroundColor: '#282b41',
            pointBorderColor: '#282b41',
            fill: false,
        },
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