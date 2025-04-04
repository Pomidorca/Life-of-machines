import { scales } from "chart.js";

export const CarryingOutVolumes = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [{
            label: 'Коэфф вскрыши',
            data: [9.14, 8.39, 8.83, 9.14, 12.39],
            backgroundColor: '#909090',
            borderColor: '#909090',
            pointStyle: 'circle',
            pointRadius: 5,
            type: 'line'
        },
        {
            label: 'Объем вскрыши, млн м3',
            data: [3.5, 0.9, 3.5, 7.1, 2.2],
            backgroundColor: '#ff7f0e',
            borderColor: '#ff7f0e',
            pointStyle: 'circle',
            pointRadius: 5,
            type: 'line'
        },
        {
            label: 'Объем добычи, млн т',
            data: [32, 7.3, 28, 48.8, 19.9],
            backgroundColor: '#5c9ad2'
        },
    ]
}

export const CarryingOutVolumesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    height: 300,
    plugins: {
        title: {
            display: true,
            text: 'Выполнение объемов добычи угля и вскрышных работ',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'bottom',
            onClick: (evt, legendItem, legend) => {

                console.log(legendItem.datasetIndex)

                legend.chart.toggleDataVisibility(legendItem.datasetIndex)
                legend.chart.update()

            }
        }
    },
    scales: {
        y: {
            beginAtZero: true
        },
        x: {
            beginAtZero: true
        }
    }
};

export const DynamicsUnitCosts = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    datasets: [{
            label: 'Запасные части',
            data: [2, 5, 1, 1, 13, 1, 4],
            backgroundColor: 'rgba(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointRadius: 0,
        },
        {
            label: 'Капиатльный ремонт',
            data: [10, 12, 18, 17, 23, 15, 16],
            backgroundColor: 'rgba(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            pointRadius: 0,
        },
        {
            label: 'Прочее',
            data: [2, 5, 1, 1, 13, 1, 4],
            backgroundColor: 'rgba(255, 206, 86)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            pointRadius: 0,
        },
        {
            label: 'ТО',
            data: [5, 7, 15, 18, 25, 20, 22],
            backgroundColor: 'rgba(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointRadius: 0,
        },
        {
            label: 'Топливо',
            data: [5, 4, 14, 16, 24, 19, 21],
            backgroundColor: 'rgba(153, 102, 255)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            pointRadius: 0,
        },
        {
            label: 'ТР',
            data: [16, 19, 22, 23, 25, 21, 26],
            backgroundColor: 'rgba(255, 159, 64)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            pointRadius: 0,
        },
        {
            label: 'Эксплутационные завтраты',
            data: [2, 5, 1, 1, 13, 1, 4],
            backgroundColor: 'rgba(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointRadius: 0,
        },
    ]
}


export const DynamicsUnitCostsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            onClick: (evt, legendItem) => {
                console.log(legendItem)
            }
        },
        title: {
            display: true,
            text: 'Годовая производительность парка',
            font: {
                size: 20
            },
        }
    },
    scales: {
        y: {
            stacked: true,
            beginAtZero: true,
        },
        x: {
            stacked: true,
        },
    },
}

export const DynamicsUnitCostsTwo = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    datasets: [{
            label: '',
            data: [19, 29, 36, 37, 75, 38, 48],
            backgroundColor: 'rgba(153, 102, 255)',
            borderColor: 'rgba(153, 102, 255, 1)',
            type: 'line',
        },
        {
            label: 'Запасные части',
            data: [2, 5, 1, 1, 13, 1, 4],
            backgroundColor: 'rgba(255, 99, 132)',
        },
        {
            label: 'Капиатльный ремонт',
            data: [10, 12, 18, 17, 23, 15, 16],
            backgroundColor: 'rgba(54, 162, 235)',
        },
        {
            label: 'Прочее',
            data: [2, 5, 1, 1, 13, 1, 4],
            backgroundColor: 'rgba(255, 206, 86)',
        },
        {
            label: 'ТО',
            data: [5, 7, 15, 18, 25, 20, 22],
            backgroundColor: 'rgba(75, 192, 192)',
        }
    ]
}

export const DynamicsUnitCostsTwoOptions = {
    responsive: true,
    maintainAspectRatio: false,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Динамика удельных затрат на экскавацию, руб./м3',
            font: {
                size: 20
            },
        }
    },
    scales: {
        y: {
            stacked: true,
            beginAtZero: true,
        },
        x: {
            stacked: true,
        },
    },
}


export const StructureKFV = {
    labels: [],
    datasets: [{
            label: '',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: '',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
};

export const StructureKFVOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Сравнение целевых и фактических удельных затрат, руб/м3',
            font: {
                size: 20
            }
        },
        tooltip: {
            enabled: true
        },

    },
    scales: {
        r: {
            ticks: {
                display: false
            }
        }
    }
}

export const CostStructure = {
    labels: [],
    datasets: []
}

export const CostStructureOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Динамика удельных затрат на экскавацию, руб./м3',
            font: {
                size: 20
            },
        }
    },
    scales: {
        y: {
            stacked: true,
            beginAtZero: true,
        },
        x: {
            stacked: true,
        },
    },
}

export const DynamicsSpecificAccumulated = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [{
            label: 'Удельные накопленные затраты, руб./од',
            data: [5.11, 5.93, 6.29, 4.44, 1.91, 2.5, 2.48, 2.74],
            backgroundColor: 'rgba(255, 206, 86)',
            borderColor: 'rgba(255, 206, 86, 1)',
            yAxisID: 'y-cost',
        },
        {
            label: 'Производительность, млн. ткм; куь.м; пог.м',
            data: [9.35, 6.80, 8.83, 9.19, 8.79, 7.17, 7.17, 7.33],
            backgroundColor: '#ccae53',
            borderColor: '#ccae53',
            yAxisID: 'x-costTwo',
        },
    ]
}

export const DynamicsSpecificAccumulatedOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Динамика удельных накопленных затрат и производительности',
            font: {
                size: 20
            },
        }
    },
    scales: {
        'y-cost': {
            type: 'linear',
            position: 'right',
            title: {
                display: true,
                text: 'млн. ткм; куь.м; пог.м',
            },
            grid: { display: false }
        },
        'y-costTwo': {
            type: 'linear',
            position: 'left',
            title: {
                display: true,
                text: 'руб./ед',
                align: 'start'
            },
        },
        x: { // Обязательная ось X
            display: true,
            title: { display: true, text: 'Год' }
        }
    }
}

export const DynamicsUnitCostsThree = {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: "Удельные затраты на ГЭ с электроприводом",
        data: [19, 29, 36, 37, 75, 38, 48],
        borderDash: [5, 5],
        backgroundColor: "#26355d",
        borderColor: "#26355d",
        type: "line", 
      },
      {
        label: "Удельные затраты на ГЭ с дизельным приводом",
        data: [2, 5, 1, 1, 13, 1, 4],
        borderDash: [10, 10],
        backgroundColor: "#944e16",
        borderColor: "#944e16",
        type: "line",
      },
      {
        label: "Срок эксплуатации",
        data: [10, 12, 18, 17, 23, 15, 16,],
        backgroundColor: "#26355d",
        type: 'scatter',
      },
      {
        label: "Срок эксплуатации",
        data: [5, 7, 15, 18, 25, 20, 22],
        backgroundColor: "#944e16",
        type: 'scatter',
      }
    ],
  };

export const DynamicsUnitCostsThreeOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Динамика удельных затрат в мировой практике',
            font: {
                size: 20
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Удельные затраты на эксплуатацию, руб/м3',
                    font: {
                        size: 12
                    }
                }
            }
        }
    },
}