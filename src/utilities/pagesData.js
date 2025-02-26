
class Page{
    constructor(name, links) {
        this.name = name;
        this.links = links;
    }
}

export const pages = [
    new Page('active', [
        { text: 'Общая структура', mode: 'GeneralInformation' },
    ]),
    new Page('time', [
        { text: 'Общая структура КФВ', mode: 'GeneralInformation' },
        { text: 'Анализ', mode: 'analysis' },
    ]),
    new Page('TechnicalEconomicIndicators', [
        { text: 'Производительность', mode: 'GeneralInformation' },
        { text: 'Затраты', mode: 'DynamicStructure' },
    ]),
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