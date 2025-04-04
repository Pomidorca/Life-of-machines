let delayed;


export const LineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
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
                text: 'Срок эксплуатации, шт',
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


export const changeStructureOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Изменения среднего роста эксплуатации парка оборудования ',
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