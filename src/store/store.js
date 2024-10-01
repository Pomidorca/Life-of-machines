import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            header: [
                {
                    id: 0,
                    title: 'Актив',
                    img: 'img/header/1.svg',
                    route: 'active',
                },
                {
                    id: 1,
                    title: 'Время',
                    img: 'img/header/2.svg',
                    route: 'time',
                },
                {
                    id: 2,
                    title: 'ТЭП',
                    img: 'img/header/3.svg' ,
                    route: 'TechnicalEconomicIndicators'
                },
                {
                    id: 3,
                    title: 'ТОиР',
                    img: 'img/header/4.svg',
                    route: 'MaintenanceRepair'
                },
                {
                    id: 4,
                    title: 'КТГ',
                    img: 'img/header/5.svg',
                    route: 'TechnicalCosts'
                },
                {
                    id: 5,
                    title: 'ТСО',
                    img: 'img/header/6.svg',
                    route: 'TechnicalStructure'
                },
                {
                    id: 6,
                    title: 'STR',
                    img: 'img/header/7.svg',
                    route: 'Structure'
                },
                {
                    id: 7,
                    title: 'NPV',
                    img: 'img/header/8.svg',
                    route: 'NPV'
                }
            ],
            techniques: [
                {
                    id: 0,
                    image: 'img/tech/1.png',
                    title: 'Экскаватор',
                    total: '171',
                    repair: '15',
                },
                {
                    id: 1,
                    image: 'img/tech/2.png',
                    title: 'Самосвал',
                    total: '100',
                    repair: '10',
                },{
                    id: 2,
                    image: 'img/tech/3.png',
                    title: 'Автогрейдеры',
                    total: '8',
                    repair: '-',
                },
                {
                    id: 3,
                    image: 'img/tech/4.png',
                    title: 'Бур.станки',
                    total: '10',
                    repair: '1',
                },
                {
                    id: 4,
                    image: 'img/tech/5.png',
                    title: 'Бульдозеры',
                    total: '20',
                    repair: '2',
                },
                {
                    id: 5,
                    image: 'img/tech/1.png',
                    title: 'Экскаватор',
                    total: '171',
                    repair: '15',
                },
                {
                    id: 5,
                    image: 'img/tech/1.png',
                    title: 'Экскаватор',
                    total: '171',
                    repair: '15',
                },
            ],
            selectedTechnique: null,
            equipments: [
                {
                    id: 0,
                    title: 'Все'
                },
                {
                    id: 1,
                    title: 'EX1200-7'
                },
                {
                    id: 2,
                    title: 'HD785-7'
                },
                {
                    id: 3,
                    title: 'PC 1250-7'
                },
                {
                    id: 4,
                    title: 'PC 3000-6E'
                },
                {
                    id: 5,
                    title: 'PC 5500-6E'
                },
                {
                    id: 6,
                    title: 'PC 1250-7'
                },
                {
                    id: 7,
                    title: 'PC 3000-6E'
                },
                {
                    id: 8,
                    title: 'PC 5500-6E'
                }
                
            ],
        }
    },
    mutations: {
        selectTechnique(state, technique) {
            state.selectTechnique = technique
            
        }
    }
})

export default store