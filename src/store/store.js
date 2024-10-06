import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            header: [
                {
                    id: 0,
                    title: 'Актив',
                    img: 'img/header/1.svg',
                    route: '/active',
                },
                {
                    id: 1,
                    title: 'Время',
                    img: 'img/header/2.svg',
                    route: '/time',
                },
                {
                    id: 2,
                    title: 'ТЭП',
                    img: 'img/header/3.svg' ,
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
                    route: '/Structure'
                },
                {
                    id: 7,
                    title: 'NPV',
                    img: 'img/header/8.svg',
                    route: '/NPV'
                }
            ],
            techniques: [
                {
                    id: 0,
                    image: 'img/tech/1.png',
                    title: 'Все машины',
                    total: '173',
                    repair: '15',
                },
                {
                    id: 1,
                    image: 'img/tech/1.png',
                    title: 'Экскаватор',
                    total: '25',
                    repair: '2',
                },
                {
                    id: 2,
                    image: 'img/tech/2.png',
                    title: 'Самосвал',
                    total: '100',
                    repair: '10',
                },
                {
                    id: 3,
                    image: 'img/tech/3.png',
                    title: 'Автогрейдеры',
                    total: '8',
                    repair: '0',
                },
                {
                    id: 4,
                    image: 'img/tech/4.png',
                    title: 'Бур.станки',
                    total: '10',
                    repair: '1',
                },
                {
                    id: 5,
                    image: 'img/tech/5.png',
                    title: 'Бульдозеры',
                    total: '20',
                    repair: '2',
                },
                {
                    id: 6,
                    image: 'img/tech/6.png',
                    title: 'Погрузчики',
                    total: '10',
                    repair: '0',
                }

            ],
            selectedTechnique: null,
            equipments: [
                {
                    id: 0,
                    title: 'EX1200',
                    UnderName: [ 
                      { id: 1, name: 'EX1200-1' },
                      { id: 2, name: 'EX1200-32' },
                      { id: 3, name: 'EX1200-45' },
                      { id: 4, name: 'EX1200-056' } 
                    ]
                  },
                  {
                    id: 1,
                    title: 'HD785',
                    UnderName: [ 
                      { id: 1, name: 'HD785-1' },
                      { id: 2, name: 'HD785-32' },
                      { id: 3, name: 'HD785-45' },
                      { id: 4, name: 'HD785-056' } 
                    ]
                  },
                  {
                    id: 2,
                    title: 'PC 1250',
                    UnderName: [ 
                      { id: 1, name: 'PC 1250-1' },
                      { id: 2, name: 'PC 1250-32' },
                      { id: 3, name: 'PC 1250-45' },
                      { id: 4, name: 'PC 1250-056' } 
                    ]
                  },
                  {
                    id: 3,
                    title: 'PC 3000',
                    UnderName: [ 
                      { id: 1, name: 'PC 3000-1' },
                      { id: 2, name: 'PC 3000-32' },
                      { id: 3, name: 'PC 3000-45' },
                      { id: 4, name: 'PC 3000-056' } 
                    ]
                  },  
                
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