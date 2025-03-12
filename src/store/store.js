import {
    createStore
} from "vuex";

const store = createStore({
    state() {
        return {
            header: [{
                    id: 0,
                    title: 'Актив',
                    img: 'img/header/active.svg',
                    imgActive: 'img/header/active_active.svg',
                    route: '/active',
                },
                {
                    id: 1,
                    title: 'КФВ',
                    img: 'img/header/kfv.svg',
                    imgActive: 'img/header/kfv_active.svg',
                    route: '/time',
                },
                {
                    id: 2,
                    title: 'ТЭП',
                    img: 'img/header/tei.svg',
                    imgActive: 'img/header/tei_active.svg',
                    route: '/TechnicalEconomicIndicators'
                },
                {
                    id: 3,
                    title: 'ТОиР',
                    img: 'img/header/toir.svg',
                    imgActive: 'img/header/toir_active.svg',
                    route: '/MaintenanceRepair'
                },
                {
                    id: 4,
                    title: 'КТГ',
                    img: 'img/header/ktg.svg',
                    imgActive: 'img/header/ktg_active.svg',
                    route: '/TechnicalCosts'
                },
                {
                    id: 5,
                    title: 'ТСО',
                    img: 'img/header/tco.svg',
                    imgActive: 'img/header/tco_active.svg',
                    route: '/TechnicalStructure'
                },
                {
                    id: 6,
                    title: 'STR',
                    img: 'img/header/str.svg',
                    imgActive: 'img/header/str_active.svg',
                    route: '/STR'
                },
                {
                    id: 7,
                    title: 'NPV',
                    img: 'img/header/npv.svg',
                    imgActive: 'img/header/npv_active.svg',
                    route: '/NPV'
                },
                {
                    id: 8,
                    title: 'Новая организация',
                    img: 'img/header/organizations.svg',
                    imgActive: 'img/header/organizations_active.svg',
                    route: '/administration/new-organization'
                },
                {
                    id: 9,
                    title: 'Новый пользователь',
                    img: 'img/header/admin_add_user.svg',
                    imgActive: 'img/header/admin_add_user_active.svg',
                    route: '/administration/new-user',
                }
            ],
            techniques: [{
                    id: 1,
                    image: 'img/tech/alltech.svg',
                    title: 'Весь парк',
                    total: '173',
                    repair: '15',
                    machineClassIds: 1
                },
                {
                    id: 4,
                    image: '/img/tech/1.svg',
                    title: 'Экскаватор',
                    total: '25',
                    repair: '2',
                    machineClassIds: 4
                },
                {
                    id: 5,
                    image: 'img/tech/2.svg',
                    title: 'Самосвал',
                    total: '100',
                    repair: '10',
                    machineClassIds: 5
                },
                {
                    id:8,
                    image: 'img/tech/3.svg',
                    title: 'Автогрейдеры',
                    total: '8',
                    repair: '0',
                    machineClassIds: 8
                },
                {
                    id: 6,
                    image: 'img/tech/4.svg',
                    title: 'Бур.станки',
                    total: '10',
                    repair: '1',
                    machineClassIds: 6
                },
                {
                    id: 7,
                    image: 'img/tech/5.svg',
                    title: 'Бульдозеры',
                    total: '20',
                    repair: '2',
                    machineClassIds: 7
                },
                {
                    id: 9,
                    image: 'img/tech/6.svg',
                    title: 'Погрузчики',
                    total: '10',
                    repair: '0',
                    machineClassIds: 9
                }
            ],
            selectedTechnique: null,
        }
    },
})

export default store