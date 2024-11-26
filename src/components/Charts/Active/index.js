import {
    useActiveStore
} from "@/store/active";

const active = useActiveStore();

export const line = {
    labels: active.line.labels,
    datasets: [{
            label: active.line.datasets[0].label,
            data: active.line.datasets[0].data,
            borderColor: active.line.datasets[0].borderColor,
            backgroundColor: active.line.datasets[0].backgroundColor,
            fill: active.line.datasets[0].fill,
        },
        {
            label: active.line.datasets[1].label,
            data: active.line.datasets[1].data,
            borderColor: active.line.datasets[1].borderColor,
            backgroundColor: active.line.datasets[1].backgroundColor,
            fill: active.line.datasets[1].fill,
        },
        {
            label: active.line.datasets[2].label,
            data: active.line.datasets[2].data,
            borderColor: active.line.datasets[2].borderColor,
            backgroundColor: active.line.datasets[2].backgroundColor,
            fill: active.line.datasets[2].fill,
        },
        {
            label: active.line.datasets[3].label,
            data: active.line.datasets[3].data,
            borderColor: active.line.datasets[3].borderColor,
            backgroundColor: active.line.datasets[3].backgroundColor,
            fill: active.line.datasets[3].fill,
            pointStyle: active.line.datasets[3].pointStyle,
            pointBorderColor: active.line.datasets[3].pointBorderColor,
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
    labels: active.changeStructure.labels,
    datasets: [{
            label: active.changeStructure.datasets[0].label,
            data: active.changeStructure.datasets[0].data,
            backgroundColor: active.changeStructure.datasets[0].backgroundColor,
            borderColor: active.changeStructure.datasets[0].borderColor,
            borderWidth: active.changeStructure.datasets[0].borderWidth,
        },
        {
            label: active.changeStructure.datasets[1].label,
            data: active.changeStructure.datasets[1].data,
            backgroundColor: active.changeStructure.datasets[1].backgroundColor,
            borderColor: active.changeStructure.datasets[1].borderColor,
            borderWidth: active.changeStructure.datasets[1].borderWidth,
        },
        {
            label: active.changeStructure.datasets[2].label,
            data: active.changeStructure.datasets[2].data,
            backgroundColor: active.changeStructure.datasets[2].backgroundColor,
            borderColor: active.changeStructure.datasets[2].borderColor,
            borderWidth: active.changeStructure.datasets[2].borderWidth,
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
    labels: active.barTurned.labels,
    datasets: [{
            label: active.barTurned.datasets[0].label,
            data: active.barTurned.datasets[0].data,
            backgroundColor: active.barTurned.datasets[0].backgroundColor,
            fill: active.barTurned.datasets[0].fill,
        },
        {
            label: active.barTurned.datasets[1].label,
            data: active.barTurned.datasets[1].data,
            backgroundColor: active.barTurned.datasets[1].backgroundColor,
            fill: active.barTurned.datasets[1].fill,
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
    labels: active.barTurnedTwo.labels,
    datasets: [{
        label: active.barTurnedTwo.datasets[0].label,
        data: active.barTurnedTwo.datasets[0].data,
        backgroundColor: [
            active.barTurnedTwo.datasets[0].backgroundColor,
        ],
        fill: active.barTurnedTwo.datasets[0].fill,
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