import {
    defineStore
} from "pinia";

export const useActiveStore = defineStore('active', {
    state: () => ({
        line: {
            labels: ['2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                    label: 'Основное',
                    data: [1, 1, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8],
                    borderColor: '#31608c',
                    backgroundColor: '#31608c',
                    fill: true,
                },
                {
                    label: 'Поддерживающее',
                    data: [NaN, NaN, NaN, NaN, NaN, NaN, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6],
                    fill: true,
                    borderColor: '#3c6f9f',
                    backgroundColor: '#3c6f9f',
                },
                {
                    label: 'Вспомогательное',
                    data: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8],
                    borderColor: '#7e9abf',
                    backgroundColor: '#7e9abf',
                    fill: true,
                },
                {
                    label: 'Итого',
                    data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    borderColor: '#0554F2',
                    pointStyle: 'circle',
                    backgroundColor: '#282b41',
                    pointBorderColor: '#282b41',
                    fill: false,
                },
            ]
        },
        changeStructure: {
            labels: ['2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                    label: 'Основное',
                    data: [1, 2, 2, 2.55, 3.55, 3.65, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
                    backgroundColor: '#4078b0',
                    borderColor: '#4078b0',
                    borderWidth: 1
                },
                {
                    label: 'Поддерживающее',
                    data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 1, 2, 2, 3, 4, 5.67, 6.55, 5, 5, 6, 7, 8, 9, 10],
                    backgroundColor: '#848484',
                    borderColor: '#848484',
                    borderWidth: 1
                },
                {
                    label: 'Вспомогательное',
                    data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 3, 4, 5, 5, 5, 6.67, 7.55, 7.8, 8, 9, 10, 11, 11],
                    backgroundColor: '#325aa3',
                    borderColor: '#325aa3',
                    borderWidth: 1
                },
            ]
        },
        barTurned: {
            labels: ['Вспомогательное', 'Поддерживающее', 'Основное', ],
            datasets: [{
                    label: 'Средний срок службы',
                    data: [7, 9, 13],
                    backgroundColor: '#7893b1',
                    fill: false,
                },
                {
                    label: 'Кол-во',
                    data: [5, 6, 8],
                    backgroundColor: '#3e6f9c',
                    fill: false,
                }
            ]
        },
        barTurnedTwo: {
            labels: ['Добычные работы', 'Вскрышные работы', 'Дополнительные работы', ],
            datasets: [{
                label: '',
                data: [5, 6, 8],
                backgroundColor: [
                    '#4d4d4d',
                    '#4d4d4d',
                    '#4d4d4d',
                ],
                fill: false,
            }]
        }
    })
})