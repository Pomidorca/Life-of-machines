import {
    createStore
} from "vuex";

const store = createStore({
    state() {
        return {
            header: [{
                    id: 0,
                    title: 'Актив',
                    img: 'img/header/1.svg',
                    route: '/active',
                },
                {
                    id: 1,
                    title: 'КФВ',
                    img: 'img/header/2.svg',
                    route: '/time',
                },
                {
                    id: 2,
                    title: 'ТЭП',
                    img: 'img/header/3.svg',
                    route: '/TechnicalEconomicIndicators'
                },
                {
                    id: 3,
                    title: 'ТОиР',
                    img: 'img/header/4.svg',
                    route: '/MaintenanceRepair'
                },
                {
                    id: 4,
                    title: 'КТГ',
                    img: 'img/header/5.svg',
                    route: '/TechnicalCosts'
                },
                {
                    id: 5,
                    title: 'ТСО',
                    img: 'img/header/6.svg',
                    route: '/TechnicalStructure'
                },
                {
                    id: 6,
                    title: 'STR',
                    img: 'img/header/7.svg',
                    route: '/STR'
                },
                {
                    id: 7,
                    title: 'NPV',
                    img: 'img/header/8.svg',
                    route: '/NPV'
                }
            ],
            techniques: [{
                    id: 1,
                    image: 'img/tech/alltech.png',
                    title: 'Все машины',
                    total: '173',
                    repair: '15',
                    machineClassIds: 1
                },
                {
                    id: 5,
                    image: '/img/tech/1.png',
                    title: 'Экскаватор',
                    total: '25',
                    repair: '2',
                    machineClassIds: 5
                },
                {
                    id: 6,
                    image: 'img/tech/2.png',
                    title: 'Самосвал',
                    total: '100',
                    repair: '10',
                    machineClassIds: 6
                },
                {
                    id: 9,
                    image: 'img/tech/3.png',
                    title: 'Автогрейдеры',
                    total: '8',
                    repair: '0',
                    machineClassIds: 9
                },
                {
                    id: 7,
                    image: 'img/tech/4.png',
                    title: 'Бур.станки',
                    total: '10',
                    repair: '1',
                    machineClassIds: 7
                },
                {
                    id: 8,
                    image: 'img/tech/5.png',
                    title: 'Бульдозеры',
                    total: '20',
                    repair: '2',
                    machineClassIds: 8
                },
                {
                    id: 10,
                    image: 'img/tech/6.png',
                    title: 'Погрузчики',
                    total: '10',
                    repair: '0',
                    machineClassIds: 10
                }

            ],
            selectedTechnique: null,
        }
    },
})

export default store