import {
    defineStore
} from "pinia";
import {
    useAuthStore
} from "./auth";
import {
    ref
} from "vue";
import ActiveDataService from "@/services/ActiveDataService.js";

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
            dateStart: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10),
            dateEnd: new Date().toISOString().slice(0, 10),
            level: null,
            breakdownType: null,
            machineModelIds: [],
            machineMarkIds: [],
            machineClassIds: [],
            machineIds: [],
            machineTypeIds: [],
        }),
        colors: [
            { background: 'rgb(31,101,145)', border: 'rgb(31,101,145)' },
            { background: 'rgb(40,126,186)', border: 'rgb(40,126,186)' },
            { background: 'rgb(61,161,234)', border: 'rgb(61,161,234)' },
            { background: 'rgb(84,173,241)', border: 'rgb(84,173,241)' },
            { background: 'rgb(132,194,243)', border: 'rgb(132,194,243)' },
            { background: 'rgb(159,210,250)', border: 'rgb(159,210,250)' },
            { background: 'rgb(182,220,250)', border: 'rgb(182,220,250)' },
            { background: 'rgb(207,229,250)', border: 'rgb(207,229,250)' },
            { background: 'rgb(150,167,184)', border: 'rgb(150,167,184)' },
            { background: 'rgb(108,119,129)', border: 'rgb(108,119,129)' },
            { background: 'rgb(97,105,112)', border: 'rgb(97,105,112)' },
            { background: 'rgb(92,97,103)', border: 'rgb(92,97,103)' },
            { background: 'rgb(71,73,76)', border: 'rgb(71,73,76)' },
            { background: 'rgb(58,58,60)', border: 'rgb(58,58,60)' },
        ]
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
        filterMachines() {
            const machineModelIds = localStorage.getItem('selectedMachineModelIds');
            const machineMarkIds = localStorage.getItem('selectedMachineMarkIds');
            const machineClassIds = localStorage.getItem('selectedMachineClassIds');
            const machineIds = localStorage.getItem('selectedMachineIds');
            const filterDate = localStorage.getItem('filterDate');
            const level = localStorage.getItem('level')

            let toggle;

            if (filterDate) {

                const filterObject = JSON.parse(filterDate)

                toggle = filterObject.toggle

            }

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
                state.filterParams.breakdownType = filterDate ? toggle : 'year';
                state.filterParams.level = level ? level : 'class'
            });
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

            await this.filterMachines()

            const storedFilterDate = localStorage.getItem('filterDate');

            if (storedFilterDate) {

                const parsedFilterDate = JSON.parse(storedFilterDate);

                this.filterParams.dateStart = new Date(parsedFilterDate.startDate).toISOString();
                this.filterParams.dateEnd = new Date(parsedFilterDate.endDate).toISOString();
            }

            let { dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds, breakdownType, level} = this.filterParams;

            // const checkingVoid = localStorage.getItem()
            //
            // if(checkingVoid) {
            //
            // }

            try {

                await ActiveDataService.getActiveStructure(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds, breakdownType, level)
                    .then((response) => {
                        this.lineDate = transformLinedate(response.data)
                    })
                    .catch((e) => {
                        console.log(e)
                        throw new Error(e)
                    })

                await ActiveDataService.getAverageAge(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds, breakdownType)
                    .then((response) => {

                        this.changeStructureDate = transformchangeStructuredate(response.data);

                    })
                    .catch((e) => {
                        console.log(e)
                        throw new Error(e)
                    })

                await ActiveDataService.getWorkDistribution(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {

                        this.barTurnedTwoDate = transformbarTurnedTwoDate(response.data);

                    })
                    .catch((e) => {
                        console.log(e)
                        throw new Error(e)
                    })

                await ActiveDataService.getCountAndAverageAge(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds)
                    .then((response) => {
                        this.barTurnedDate = transformbarTurnedDate(response.data);
                    })
                    .catch((e) => {
                        console.log(e)
                        throw new Error(e)
                    })

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

    const colors = [
        { background: 'rgb(31,101,145)', border: 'rgb(31,101,145)' },
        { background: 'rgb(40,126,186)', border: 'rgb(40,126,186)' },
        { background: 'rgb(61,161,234)', border: 'rgb(61,161,234)' },
        { background: 'rgb(84,173,241)', border: 'rgb(84,173,241)' },
        { background: 'rgb(132,194,243)', border: 'rgb(132,194,243)' },
        { background: 'rgb(159,210,250)', border: 'rgb(159,210,250)' },
        { background: 'rgb(182,220,250)', border: 'rgb(182,220,250)' },
        { background: 'rgb(207,229,250)', border: 'rgb(207,229,250)' },
        { background: 'rgb(150,167,184)', border: 'rgb(150,167,184)' },
        { background: 'rgb(108,119,129)', border: 'rgb(108,119,129)' },
        { background: 'rgb(97,105,112)', border: 'rgb(97,105,112)' },
        { background: 'rgb(92,97,103)', border: 'rgb(92,97,103)' },
        { background: 'rgb(71,73,76)', border: 'rgb(71,73,76)' },
        { background: 'rgb(58,58,60)', border: 'rgb(58,58,60)' },
    ]

    const allKeys = Array.from(new Set(data.flatMap(item => item.children.map(child => child.key))));

    const childrenDatasets = allKeys.map((key, index) => {

        const colorIndex = index % colors.length;

        return {
            label: key,
            data: data.map(item => {
                const child = item.children.find(child => child.key === key);
                return child ? child.quantity : 0;
            }),
            borderColor: colors[colorIndex].background,
            backgroundColor: colors[colorIndex].border,
            fill: true,
            stack: 'stack0'
        };
    });

    const labels = data.map(item => item.key);
    // const stackedDatasets = [
    //     {
    //         label: 'Основное',
    //         data: data.map(item => item.main),
    //         borderColor: '#31608c',
    //         backgroundColor: '#31608c',
    //         fill: true,
    //         stack: 'stack0'
    //     },
    //     {
    //         label: 'Вспомогательное',
    //         data: data.map(item => item.auxiliary),
    //         borderColor: '#7e9abf',
    //         backgroundColor: '#7e9abf',
    //         fill: true,
    //         stack: 'stack0'
    //     }
    // ].filter(dataset => dataset.data.some(value => value !== 0));


    const totalDataset = {
        label: 'Итого',
        data: data.map(item => item.main + item.auxiliary),
        borderColor: '#636161',
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
        datasets: [totalDataset, ...childrenDatasets ]
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
    const labels = data.map(item => item.key);
    const datasets = [{
            label: 'Основное',
            data: data.map(item => item.main),
            backgroundColor: '#4078b0',
            borderColor: '#4078b0',
            borderWidth: 1
        },
        {
            label: 'Вспомогательное',
            data: data.map(item => item.auxiliary),
            backgroundColor: '#848484',
            borderColor: '#848484',
            borderWidth: 1
        }
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
    const labels = ['Основное оборудование', 'Вспомогательное оборудование'];
    const datasets = [{
            label: 'Средний срок службы',
            data: [data.mainAvgAge, data.auxiliaryAvgAge],
            backgroundColor: '#4078b0',
            borderColor: '#4078b0',
            borderWidth: 1
        },
        {
            label: 'Количество',
            data: [data.mainCount, data.auxiliaryCount],
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