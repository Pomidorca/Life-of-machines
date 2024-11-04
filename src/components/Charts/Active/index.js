export const line = {
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
}

let delayed;
export const LineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 100,
    width: 100,
    plugins: {
        title: {
            display: true,
            text: 'Изменения среднего роста эксплуатации парка оборудования',
            font: {
                size: function (context) {
                    if (context.chart.width < 500) {
                        return 12
                    } else {
                        return 20
                    }
                }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        legend: {
            position: 'bottom',
            labels: {
                usePointStyle: true,
            }
        }
    },
    tooltip: {
        callbacks: {
            label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += context.parsed.y;
                }
                return label;
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            stacked: true,
            title: {
                display: true,
                text: 'Срок эксплуатации, лет',
                font: {
                    size: function (context) {
                        if (context.chart.width < 500) {
                            return 10
                        } else {
                            return 16
                        }
                    }
                }
            }
        },
    },
    animation: {
        onComplete: () => {
            delayed = true;
        },
        delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 100 + context.datasetIndex * 100;
            }
            return delay;
        },
    }
}

export const changeStructure = {
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
}

export const changeStructureOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Изменения структуры парка оборудования',
            font: {
                size: function (context) {
                    if (context.chart.width < 500) {
                        return 12
                    } else {
                        return 20
                    }
                }
            }
        },
    },
}

export const barTurned = {
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
}

export const barOptionsTurned = {
    responsive: true,
    maintainAspectRation: true,
    height: 300,
    indexAxis: 'y',
    plugins: {
        title: {
            display: true,
            text: 'Струкрура парка оборудования на текущий период',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'bottom'
        }
    }
}

export const barTurnedTwo = {
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

export const barOptionsTurnedTwo = {
    responsive: true,
    maintainAspectRation: true,
    height: 300,
    indexAxis: 'y',
    plugins: {
        title: {
            display: true,
            text: 'Распределение парка оборудования по видам работ',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'bottom'
        },

    }
}