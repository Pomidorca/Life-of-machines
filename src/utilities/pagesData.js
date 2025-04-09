import { useActiveStore } from "@/store/active";
import { useKFVStore } from "@/store/kfv";
import { useTEPStore } from "@/store/tep";

class Page {
    constructor(name, links, updateStore) {
        this.name = name;
        this.links = links;
        this.updateStore = updateStore;
    }
}

export const pages = [
    new Page('active', [
        { text: 'Общая структура', mode: 'GeneralInformation' },
    ], (startYear, endYear) => {
        const activeStore = useActiveStore();
        activeStore.updateFilterParams({ yearStart: startYear, yearEnd: endYear });
    }),
    new Page('time', [
        { text: 'Общая структура КФВ', mode: 'GeneralInformation' },
        { text: 'Анализ', mode: 'analysis' },
    ], (startYear, endYear) => {
        const KfvStore = useKFVStore();
        KfvStore.updateFilterParams({ yearStart: startYear, yearEnd: endYear });
    }),
    new Page('TechnicalEconomicIndicators', [
        { text: 'Производительность', mode: 'GeneralInformation' },
        { text: 'Затраты', mode: 'DynamicStructure' },
        { text: 'Анализ', mode: 'analysis' },
    ], (startYear, endYear) => {
        const tepStore = useTEPStore();
        tepStore.updateFilterParams({ yearStart: startYear, yearEnd: endYear });
    }),
    new Page('MaintenanceRepair', [
        { text: 'Общие сведения', mode: 'GeneralInformation' },
        { text: 'Динамика структуры', mode: 'DynamicStructure' },
    ]),
    new Page('TechnicalCosts', []),
    new Page('TechnicalStructure', [
        { text: 'Формирование стратегий', mode: 'GeneralInformation' },
        { text: 'ТПР', mode: 'DynamicStructure' },
    ]),
    new Page('STR', [
        { text: 'Добыча', mode: 'GeneralInformation' },
        { text: 'Вскрыша', mode: 'DynamicStructure' },
    ]),
    new Page('NPV', [
        { text: 'Сравнение', mode: 'GeneralInformation' },
    ]),
];