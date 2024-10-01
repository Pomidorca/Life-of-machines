import {
    data
} from "autoprefixer";
import {
    animator,
    plugins,
    scales,
    Title
} from "chart.js"





export const line = {
    labels: ['2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [{
            label: 'БелАз 75306/2',
            data: [1.00, 1.88, 2.71, 3.54, 4.35, 5.07, 5.78, 6.49, 7.20, 7.91, 8.62, 9.33, 10.05, 10.76, 11.47, 12.19, 12.90, 13.62, 14.33, 15.04, 15.75],
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
        },
        {
            label: 'CAT 777',
            data: [NaN, NaN, NaN, NaN, NaN, NaN, 1, 4.78, 5.49, 6.20, 6.91, 8, 8.33, 9.05, 9.76, 10.47, 11.19, 11.90, 12.62, 13.33, 14.04],
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
        },
        {
            label: 'CAT 785C/БелАЗ 75137',
            data: [1, 2, 2.2, 3.2, 4.67, 5.67, 6.67, 7.67, 8.67, 9.67, 20.67, 11.67, 12.67, 13.67, 14.67, 15.67, 16.67, 17.67, 18.67, 19.67, 20.67],
            fill: true,
            borderColor: 'rgb(255, 255, 0)',
            backgroundColor: 'rgba(255, 255, 0, 0.2)',
            pointStyle: 'dash',
        }
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
                size: function(context) {
                    if (context.chart.width < 500) {
                        return 12
                    } else {
                        return 20
                    }
                }
            }
        },
        legend: {
            position: 'bottom'
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
            title: {
                display: true,
                text: 'Срок эксплуатации, лет',
                font: {
                    size: function(context) {
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

export const bar = {
    labels: ['2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [{
            label: 'БелАз 75306/2',
            data: [1.00, 1.88, 2.71, 3.54, 4.35, 5.07, 5.78, 6.49, 7.20, 7.91, 8.62, 9.33, 10.05, 10.76, 11.47, 12.19, 12.90, 13.62, 14.33, 15.04, 15.75],
            backgroundColor: 'rgb(173, 216, 230)',
            fill: false,
        },
        {
            label: 'CAT 777',
            data: [NaN, NaN, NaN, NaN, NaN, NaN, 1, 4.78, 5.49, 6.20, 6.91, 8, 8.33, 9.05, 9.76, 10.47, 11.19, 11.90, 12.62, 13.33, 14.04],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
        },
        {
            label: 'CAT 785C/БелАЗ 75137',
            data: [1, 2, 2.2, 3.2, 4.67, 5.67, 6.67, 7.67, 8.67, 9.67, 10.67, 11.67, 12.67, 13.67, 14.67, 15.67, 16.67, 17.67, 18.67, 19.67, 20.67],
            fill: true,
            backgroundColor: 'rgba(255, 255, 0, 0.2)',
            pointStyle: 'dash',
        }
    ]
}

export const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        title: {
            display: true,
            text: 'Изменения структуры парка оборудования',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'bottom'
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Количество оборудования, ед.',
            }
        },
    },

}

export const barTurned = {
    labels: ['БелАЗ 75302', 'БелАЗ 75137', 'БелАЗ 74306', ],
    datasets: [{
            label: 'Средний срок службы',
            data: [12, 9.8, 14],
            backgroundColor: 'rgb(173, 216, 230)',
            fill: false,
        },
        {
            label: 'Кол-во',
            data: [7, 5, 1],
            backgroundColor: 'rgb(173, 216, 0)',
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
    labels: ['Доп.Работы', 'Добычные работы', 'Вскрышные работы'],
    datasets: [{
        label: '',
        data: [5, 25, 30],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
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

export const lineTwo = {
    labels: ['Время заправки', 'Нулевой пробег', 'Зачистка бульдозером', 'ЛН', 'Ожидание погрузки', 'Время разгрузки', 'Время установки под погрузку', 'Время обеда', 'ПЗО', 'Время установки под разгрузку', 'Время погрузки', 'Время движения порожним', 'Время движения на отвал'],
    datasets: [{
        label: '',
        data: [5, 5, 10, 10, 18, 30, 30, 30, 35, 48, 54, 222, 223],
        backgroundColor: 'rgba(0,128,0)',
        fill: false,
    }]
}

export const lineOptionsTwo = {
    responsive: true,
    maintainAspectRation: false,
    indexAxis: 'y',
    plugins: {
        title: {
            display: true,
            text: 'Распределение внутрисменного времени',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'null'
        },

    }
}

export const Doughnut = {
    labels: ['Время работы в наряде', 'Плановые простои на ТОиР', 'Неплановые технические простои'],
    datasets: [{
        label: '',
        data: [5, 25, 30],
        backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
        ],
        fill: false,
    }]
}

export const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    height: 500,
    plugins: {
        title: {
            display: true,
            text: 'БелАЗ_75306/302',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'bottom'
        }
    }
}

export const ChangingOpeningHours = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [{
            label: '',
            data: ['7000', '6974', '6745', '6515', '6285', '6055', '5825', '5595'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            tension: 0.2
        },
        {
            label: '',
            data: ['7534', '7509', '7159', '5377', '5352', '3570', '3545', '3520', '3495', '3470', '3445', '4336', '4311', '4286', '4211', '4186'],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false,
            tension: 0.2
        },
        {
            label: '',
            data: ['6543', '6518', '6493', '6468', '6443', '6418', '6393', '6368', '6343', '6318', '6293', '6268', '6243', '6218', '6193', '6168'],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            fill: false,
            tension: 0.2
        },
        {
            label: '',
            data: ['5452', '5427', '5402', '5377', '5352', '3570', '3545', '3520', '3495', '3470', '3445', '4336', '4311', '4286', '4261', '5102', '5077'],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.2
        },
        {
            label: '',
            data: ['3670', '3645', '5427', '5402', '5377', '5352', '3570', '3545', '3520', '3495', '3470', '3445', '4336', '4311', '4286', '4211', '4186'],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false,
            tension: 0.2
        },
        {
            label: '',
            data: ['2664', '7484', '7459', '7434', '7409', '7384', '7359', '7334', '7309', '7284', '7259', '7234', '7209', '7184', '3295', ],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            fill: false,
            tension: 0.2
        },
        {
            label: '',
            data: ['2789', '2764', '2739', '2714', '2689', '2664', '2639', '2614', '2589', '2564', '2539', '2514', '2489', '2464', '2439', '2414'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            tension: 0.2
        },
        {
            label: '',
            data: ['1898', '1873', '1848', '1823', '1798', '1773', '1748', '1723', '1698', '1673', '1648', '1623', '1598', '1573', '1548', '1523'],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false,
            tension: 0.2
        },
        {
            label: '',
            data: ['1107', '1082', '1057', '1032', '1007', '982', '957', '256', '231', '206', '181', '156', '131', '106', '81', '56'],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            fill: false,
            tension: 0.2
        },
        {
            label: '',
            data: ['431', '406', '381', '356', '331', '306', '281', '1698', '1673', '1648', '1623', '1598', '1573', '1548', '1523'],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.2
        },
    ]
}

export const ChangingOpeningHoursOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        title: {
            display: true,
            text: 'Изменение времени работы на линии от срока эксплуатации оборудования',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'null'
        }
    }
}

export const Scatter = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
    datasets: [{
            label: 'БелАЗ 75131',
            data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80, 81, 56, 55, 40, 55, 30, 80, 81, 56, 55, 40, 55, 30, 80],
            borderColor: 'blue',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0
        },
        {
            label: 'Unit Rig MT3300',
            data: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480],
            borderColor: 'green',
            borderWidth: 2,
            pointRadius: 0,
        },
        {
            label: 'Haulpak 510E',
            data: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235],
            borderColor: 'red',
            borderWidth: 2,
            pointRadius: 0,
        },
        {
            label: '',
            data: [15, 35, 60, 25, 45, 55, 30 , 65, 45, 25, 55, 30, 45, 25, 65, 45, 30, 25, 45, 30, 45, 30, 25, 45],
            type: 'scatter',
            pointRadius: 5,
            borderColor: 'blue',
            backgroundColor: 'blue',
            borderWidth: 1,
            pointStyle: 'rectRot',
        },
        {
            label: '',
            data: [10, 40, 30, 20, 50, 80, 70, 60, 90, 120, 110, 100, 150, 140, 120, 180, 170, 120, 190, 220, 210, 200, 230, 240],
            type: 'scatter',
            pointRadius: 5,
            borderColor: 'red',
            backgroundColor: 'red',
            borderWidth: 1,
            pointStyle: 'triangle',
        },
        {
            label: '',
            data: [20, 60, 60, 60, 100, 100, 140, 120, 180, 180, 220, 220, 260, 300, 300, 300, 340, 330, 380, 420, 420, 420, 460, 480],
            type: 'scatter',
            pointRadius: 5,
            borderColor: 'green',
            backgroundColor: 'green',
            borderWidth: 1,
            pointStyle: 'rect',
        }
    ]
}

export const ScatterOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        }
    },
    scales: {
        y: {
            title: {
                display: true,
                text: 'Время работы на линии',
            }
        },
        x: {
            title: {
                display: true,
                text: 'Срок служдбы, год',
            }
        }
    }
}


export const ScatterTwo = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
    datasets: [{
            label: 'Линейные данные',
            data: [52, 83, 97, 104, 162, 183, 205, 263, 312, 342, 373, 405, 436, 468, 500, 531, 563, 595, 627, 658, 690, 722, 753, 785],
            borderColor: 'blue',
            borderWidth: 2,
            pointRadius: 0,
    },
    {
        label: '',
        data: [15, 35, 60, 25, 45, 55, 30 , 65, 45, 25, 55, 30, 45, 25, 65, 45, 30, 25, 45, 30, 45, 30, 25, 45],
        type: 'scatter',
        pointRadius: 5,
        borderColor: 'blue',
        backgroundColor: 'blue',
        borderWidth: 1,
        pointStyle: 'rectRot',
    },
    {
        label: '',
        data: [10, 40, 30, 20, 50, 80, 70, 60, 90, 120, 110, 100, 150, 140, 120, 180, 170, 120, 190, 220, 210, 200, 230, 240],
        type: 'scatter',
        pointRadius: 5,
        borderColor: 'red',
        backgroundColor: 'red',
        borderWidth: 1,
        pointStyle: 'triangle',
    },
    {
        label: '',
        data: [20, 60, 60, 60, 100, 100, 140, 120, 180, 180, 220, 220, 260, 300, 300, 300, 340, 330, 380, 420, 420, 420, 460, 480],
        type: 'scatter',
        pointRadius: 5,
        borderColor: 'green',
        backgroundColor: 'green',
        borderWidth: 1,
        pointStyle: 'rect',
    }
]
}

export const ScatterTwoOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'null'
        }
    },

    }

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
        {
            label: 'Удельные завтраты',
            data: [42, 60, 80, 82, 140, 80, 110],
            backgroundColor: 'rgba(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            type: 'line',
            pointRadius: 5,
        },
    ]
}


export const DynamicsUnitCostsOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Динамика удельных затрат на экскавацию, руб./м3 PC_3000-6E',
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

export const DistributionUnitCosts = {
    labels: ['Запаные части', 'Капиатльный ремонт', 'Прочее', 'Топливо', 'ТР', 'Эксплутационные завтраты'],
    datasets: [{
        label: '',
        data: [10, 12, 18, 23, 15, 16],
        backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
            'rgba(255, 99, 132)',
        ],
        fill: false,
        tension: 0.1,
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
        ],
    }]
}

export const DistributionUnitCostsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    height: 500,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Распределение удельных затрат на экскавацию в 2022г.г PC_3000-6E',
            font: {
                size: 20
            },
        },

    }
}

export const ChangeHourlyProductivity = {
    labels: ['30', '45', '60', '75', '90', '105', '120', '135', '150', '165', '180'],
    datasets: [{
            label: 'Тц = 46 сек Ксм=0,83',
            data: [1362, 1252, 1160, 1080, 1011, 949, 895, 847, 803, 764, 729],
            backgroundColor: 'rgba(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointStyle: 'rectRot',
            pointRadius: 5
        },
        {
            label: 'Тц = 46 сек Ксм=0,78',
            data: [1280, 1178, 1091, 1015, 950, 892, 841, 796, 755, 718, 685],
            backgroundColor: 'rgba(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            pointStyle: 'rect',
            pointRadius: 5
        },
        {
            label: 'Тц = 46 сек Ксм=0,78',
            data: [1149, 1057, 979, 911, 852, 801, 755, 714, 677, 644, 614],
            backgroundColor: 'rgba(255, 206, 86)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            pointStyle: 'triangle',
            pointRadius: 5

        },
        {
            label: 'Тц = 32 сек Ксм=87%',
            data: [1866, 1687, 1540, 1416, 1311, 1238, 1176, 1124, 1080, 1041, 1007],
            backgroundColor: 'rgba(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointStyle: 'crossRot',
            pointRadius: 5
        }
    ]
}

export const ChangeHourlyProductivityOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Изменение часовой производительности PC-5500 от времени обмена при различных значениях Ксм при погрузке в Белаз 75306 при Тц=32 сек и 46 сек',
            font: {
                size: 20
            },
        },

    },
}

export const StructureEmergencyDowntimes = {
    labels: ['032 Устранение утечек, замена уплотнений, колец, РВД', '071 Неисправимость ходовых (бортовых, РМК, ГП) редукторов', '082 Диагностика КПП, ГМП, ГТР', '032 Устранение утечек, замена уплотнений, колец, РВД', '071 Неисправность ходовых (бортовых, РМК, ГП) редукторов', '082 Диагностика КПП, ГИП, ГТР'],
    datasets: [{
        label: '',
        data: [1, 59, 4, 30, 4, 13],
        backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
        ],
        fill: false,
        tension: 0.1,
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
        ],
    }]
}

export const StructureEmergencyDowntimesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    height: 500,
    plugins: {
        legend: {
            position: 'right',
            labels: {
                padding: 20
            }
        },
        title: {
            display: true,
            text: 'Структура аварийных простоев',
            font: {
                size: 20
            },
        },
    }
}

export const StructureEmergencyDowntimesTwo = {
    labels: [
        '01 Система смазки (оператор)',
        '014 Несиправность РВД системы смазки',
        '022 Несиправность РВД',
        '028 Перегрев',
        '033 Доливка масла, ОЖ',
        '038 Аварийная замена топливных филтров',
        '051 Наладка электрооборудования',
        '063 Устранение утечек',
        '072 Устранение утечки масла с холодных редукторов',
        '102 Несиправность компрессора',
        '011 Закачка системы смазки',
        '015 Ремонт (замена) компонентов системы смазки',
        '025 Доливка гидравлической жидкости',
        '03 ДВС',
        '034 Несиправность системы охлаждения(ДВС)',
        '039 Неисправность топливной системы',
        '052 Ремонт освещения',
        '064 Доливки',
        '09 РПН',
        '11 Кабина оператора (оператор)',
    ],
    datasets: [{
        label: '',
        data: [1, 59, 4, 30, 4, 13, 1, 59, 4, 30, 4, 13, 1, 59, 4, 30, 4, 13, 1, 59, 4, 30, 4, 13],
        backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',

        ],
        fill: false,
        tension: 0.1,
    }]
}

export const StructureEmergencyDowntimesOptionsTwo = {
    responsive: true,
    maintainAspectRatio: false,
    height: 600,
    plugins: {
        legend: {
            position: 'left',
            labels: {
                padding: 20
            },


        },
        title: {
            display: true,
            text: 'Структура аварийных простоев',
            font: {
                size: 20
            },
        },
    }
}


export const ActualAccidentRate = {
    labels: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    datasets: [{
        label: 'Значение показателя',
        data: [2, 17, 22, 12, 2, 17, 22, 12, 42, 37, 22, 62],
        backgroundColor: 'rgba(54, 162, 235)',
        borderColor: 'rgba(255, 99, 132)',
        fill: false,
        tension: 0.1
    }]
}

export const ActualAccidentRateOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        title: {
            display: true,
            text: 'Коэффициент аварийности фактический (КАФ)',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'null'
        }
    }
}

export const OrganizationOfRepairs = {
    labels: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    datasets: [{
        label: 'Значение показателя',
        data: [49, 23, 10, 26, 16, 49, 2, 12, 39, 28, 35, 10],
        backgroundColor: 'rgba(54, 162, 155)',
        borderColor: 'rgba(255, 99, 132)',
        fill: false,
        tension: 0.1
    }]
}

export const OrganizationOfRepairsOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        title: {
            display: true,
            text: 'Организация проведения ремонтов (Попр)',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'null'
        }
    }
}

export const WorkPlanningIndicator = {
    labels: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    datasets: [{
        label: 'Значение показателя',
        data: [49, 23, 10, 26, 16, 49, 10, 20, 39, 28, 35, 10],
        backgroundColor: 'rgba(54, 162, 100)',
        borderColor: 'rgba(255, 99, 132)',
        fill: false,
        tension: 0.1
    }]
}

export const WorkPlanningIndicatorOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        title: {
            display: true,
            text: 'Показатель планирования работ (Пплан)',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'null'
        }
    }
}

export const TotalEmergencyDowntime = {
    labels: ['Март', 'Апрель', 'Май', 'Июнь'],
    datasets: [{
            label: 'Самосвал',
            data: [357, 211, 200, 150],
            backgroundColor: 'rgba(54, 162, 235)',
            borderColor: 'rgba(255, 99, 132)',
            fill: false,
            tension: 0.1
        },
        {
            label: 'Экскаватор',
            data: [400, 500, 125, 300],
            backgroundColor: 'rgba(255, 206, 86)',
            borderColor: 'rgba(255, 99, 132)',
            fill: false,
            tension: 0.1
        },
        {
            label: 'Буровые машины',
            data: [500, 240, 160, 260],
            backgroundColor: 'rgba(75, 192, 192)',
            borderColor: 'rgba(255, 99, 132)',
            fill: false,
            tension: 0.1
        },
        {
            label: 'Погрузчики, бульдозер, автогрейдеры',
            data: [120, 100, 90, 180],
            backgroundColor: 'rgba(153, 102, 255)',
            borderColor: 'rgba(255, 99, 132)',
            fill: false,
            tension: 0.1
        }
    ]
}

export const TotalEmergencyDowntimeOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        title: {
            display: true,
            text: 'Общая простои на текущий период',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'bottom'
        }
    }
}

export const MeanTimeBetweenFailures = {
    labels: [
        '01 Система смазки (оператор)',
        '02 Система смазки (сотрудник)',
        '011 Закачка системы смазки',
        '012 Смазка рабочего оборудования',
        '013 Наладка системы смазки',
        '014 Неисправность РВД системы смазки',
        '015 Ремонт (замена) ккомпонентов системы сказки',
        ' 016 Ремонт системы смазки',
        ' 017 Смена мастера системы смазки',
        ' 018 Смена оператора системы смазки',
        ' 019 Смена сотрудника системы смазки',
        ' 020 Смена оператора системы смазки',
        ' 022 Неиспраовность РВД системы смазки',
        ' 023 Смена мастера системы смазки',
        ' 024 Смена сотрудника системы смазки',
        ' 025 Смена оператора системы смазки',
        ' 026 Смена мастера системы смазки',
        ' 027 Смена сотрудника системы смазки',
        ' 028 Смена оператора системы смазки',
        ' 029 Смена мастера системы смазки',
        ' 030 Смена сотрудника системы смазки',
        ' 031 Смена оператора системы смазки',
        ' 032 Смена мастера системы смазки',
        ' 033 Смена сотрудника системы смазки',
        ' 034 Смена оператора системы смазки',
        ' 035 Смена мастера системы смазки',
    ],
    datasets: [{
            label: 'Средняя наработка на отказ, ч',
            data: [890, 1714, 657, 1957, 2807, 2227, 2116, 3072, 1958, 180, 1714, 657, 1957, 2807, 2227, 2116, 3072, 1958, 180, 1714, 657, 1957, 2807, 2227, 2116, 3072, 1958, 180],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
        {
            label: 'Количество отказов',
            data: [220, 70, 100, 300, 90, 500, 100, 900, 30, 60, 600, 100, 50, 900, 1000, 900, 30, 665, 6443, 1043, 523, 965, 1054, 923, 413, 643, 6343],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            type: 'scatter',
            pointRadius: 5,
            borderWidth: 1,
        }
    ]
}

export const MeanTimeBetweenFailuresOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        title: {
            display: true,
            text: 'Среднее время между отказами',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'bottom'
        }
    }
}

export const RequiredNumberParts = {
    labels: [
        '01 Система смазки (оператор)',
        '02 Система смазки (сотрудник)',
        '011 Закачка системы смазки',
        '012 Смазка рабочего оборудования',
        '013 Наладка системы смазки',
        '014 Неисправность РВД системы смазки',
        '015 Ремонт (замена) ккомпонентов системы сказки',
        ' 016 Ремонт системы смазки',
        ' 017 Смена мастера системы смазки',
        ' 018 Смена оператора системы смазки',
        ' 019 Смена сотрудника системы смазки',
        ' 020 Смена оператора системы смазки',
        ' 022 Неиспраовность РВД системы смазки',
        ' 023 Смена мастера системы смазки',
        ' 024 Смена сотрудника системы смазки',
        ' 025 Смена оператора системы смазки',
        ' 026 Смена мастера системы смазки',
        ' 027 Смена сотрудника системы смазки',
        ' 028 Смена оператора системы смазки',
        ' 029 Смена мастера системы смазки',
        ' 030 Смена сотрудника системы смазки',
        ' 031 Смена оператора системы смазки',
        ' 032 Смена мастера системы смазки',
        ' 033 Смена сотрудника системы смазки',
        ' 034 Смена оператора системы смазки',
        ' 035 Смена мастера системы смазки',
    ],
    datasets: [{
        label: 'необходимое количество деталей, шт',
        data: [22, 7, 29, 10, 3, 1, 9, 5, 10, 19, 15, 1, 17, 21, 11, 8, 13, 4, 1, 9, 5, 9, 37, 23, 15, 1, 1, 4, 7, 7, 2, 9, 1, 3, 2, 2, 1, 1, 6],
        backgroundColor: 'rgba(54, 162, 235)',
    },
]
}

export const RequiredNumberPartsOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        title: {
            display: false,
            font: {
                size: 20
            
    }},
        legend: {
            position: 'null'
        }
    
},
scales: {
    y: {
        title: {
            display: true,
            text: 'Необходимое количество деталей, шт',
            font: {
                size: 12
            }
        }
    }
}
}

export const SpecificFilledTomorrows = {
    labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [{
        label: 'Удельное накопленные затраты, руб./т.км',
        data: [23, 13, 10, 9, 9, 8, 5, 2, 1, 4, 3, 7, 8, 12, 16, 18, 19, 20, 19, 23],
        backgroundColor: 'rgba(255, 99, 132)',
        yAxisID: 'y-cost'
    },
    {
        label: 'Удельные накопленные затраты на ТО и ТР, руб./т.км',
        data: [25, 15, 12, 11, 11, 10, 7, 4, 3, 6, 5, 9, 10, 14, 18, 20, 21, 22, 21, 25],
        backgroundColor: 'rgba(54, 162, 235)',
        yAxisID: 'y-costTwo'
    }
    ]
}

export const SpecificFilledTomorrowsOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        title: {
            display: true,
            text: 'Самосвал БелАЗ_75306 инв.2827',
            font: {
                size: 20
            
    }},
        legend: {
            position: 'bottom'
        }
    },
    scales: {
       y: {
           beginAtZero: true,
       },
       'y-cost': {
        type: 'linear',
        position: 'right',
        title: {
            display: true,
            text: 'Удельные накопленные затраты на ТО и ТР',
        }
       },
       'y-costTwo': {
        type: 'linear',
        position: 'left',
        title: {
            display: true,
            text: 'Удельные накопленные затраты ',
        }
       }
    }
}

export const cost = {
    labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [
      {
        label: 'Удельное накопленные затраты, руб./т.км',
        data: [6556000, 7029000, 6907000, 6455000, 5228000, 5416000, 6425000, 4090000, 6034000, 5995000, 6812000, 6504000, 7015000, 7025000, 7015000, 7015000, 7015000, 7015000, 7015000, 7015000],
        backgroundColor: 'rgba(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        yAxisID: 'y-cost',
      },
      {
          label: 'Затраты на ТО и ТР (регламент), руб',
          data: [18005143, 18106143, 18207143, 18308143, 18409143, 18510143, 18611143, 18712143, 18813143, 18914143, 19015143, 19116143, 19217143, 19318143, 19419143, 19520143, 19621143, 19722143, 19823143, 19924143],
          backgroundColor: 'rgba(54, 162, 35)',
          borderColor: 'rgb(54, 162, 35)',
          yAxisID: 'y-cost'
      },
      {
        label: 'Время работы, часы',
        data: [1000, 1200, 1100, 900, 800, 750, 950, 600, 850, 800, 900, 850, 900, 900, 900, 900, 900, 900, 900, 900], 
        backgroundColor: 'rgba(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        yAxisID: 'y-time' 
      }
    ]
  };
  
  export const costOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
      title: {
        display: true,
        text: 'Самосвал БелАЗ_75306 инв.2827',
        font: {
          size: 20
        }
      },
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: {
        beginAtZero: true 
      },
      'y-cost': { 
        type: 'linear', 
        position: 'left', 
        title: {
          display: true,
          text: 'Удельное накопленные затраты, руб./т.км',
          font: {
            size: 12
          }
        },
        ticks: {
          callback: function(value, index, values) {
            return value / 10000000 + ' млн.'; 
          }
        }
      },
      'y-time': { 
        type: 'linear', 
        position: 'right', 
        title: {
          display: true,
          text: 'Время работы, часы',
          font: {
            size: 12
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Год эксплуатации',
        }
      }
    }
  };
  

  export const CostStructureOwning = {
    labels: ['PC-4000', 'PC-3000', 'PC-2000', 'PC-1000', 'PC-500', 'PC-1250', 'P&H2300', 'ЭКГ-20 УЗТМ', 'ЭКГ-20КМ'],
    datasets: [
        {
            label: 'Удельная стоимость экскаваторов (стоимость приобретения / к общему объему отгруженного за период) руб/м3',
            data: [5.11, 5.93, 6.85, 7.77, 8.69, 9.61, 10.53, 11.45, 12.37],
            backgroundColor: 'rgba(255, 159, 64)',
        },
        {
            label: 'Удельные затраты на ТО, ТР, Запасные части и услуги по ТОР экскаваторов, руб/м3',
            data: [9.35, 6.80, 7.15, 7.50, 7.85, 8.20, 8.55, 8.90, 9.25],
            backgroundColor: 'rgba(255, 206, 86)',
        },
        {
            label: 'Удельные затраты на ФОТ и налоги, руб. /м3',
            data: [1.86, 2.17, 2.48, 2.79, 3.10, 3.41, 3.72, 4.03, 4.34],
            backgroundColor: 'rgba(255, 99, 132)',
        },
        {
            label: 'Удельные затраты на эксплуатацию экскаваторов (ДТ или ЭЭ, материалы), руб/м3',
            data: [8.85, 6.80, 7.15, 7.50, 7.85, 8.20, 8.55, 8.90, 9.25],
            backgroundColor: 'rgba(153, 102, 255)',
        },
        {
            label: 'ИТОГО удельные затраты на владение в течени 10 лет',
            data: [26, 23, 25, 26, 28, 30, 32, 34, 36],
            backgroundColor: 'rgba(54, 162, 235)',
            type: 'line',
        }
    ]
  } 

  export const CostStructureOwningOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
      title: {
        display: true,
        text: 'Структура затрат на владение карьерных экскаваторов, (период 10 лет)',
        font: {
          size: 20
        }
      },
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: {
        beginAtZero: true ,
        stacked: true
      },
      x: {
        beginAtZero: true,
        stacked: true
      }
    }
  };

  export const strategy = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [
        {
            label: 'Количество экскаваторов',
            data: [1, NaN, 2, 1, 1, NaN, NaN, NaN, NaN, 1, NaN, 1, NaN, 3, NaN, 1],
            backgroundColor: 'rgba(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }
    ]
  }

  export const strategyOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'null'
        },
        title: {
            display: true,
            text: 'Количество экскаваторов',
        }
  }
}

export const strategyTwo = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [
        {
            label: 'Количество самосвалов',
            data: [NaN, NaN, 1, 2, 4, 6, 15, 3, NaN, NaN, 2, 5, 1, 4, NaN, NaN],
            backgroundColor: 'rgba(255, 29, 232)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }
    ]
  }

  export const strategyOptionsTwo = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'null'
        },
        title: {
            display: true,
            text: 'Количество самосвалов',
        }
  }
}

export const CurrentStrategy = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [
        {
            label: 'OPEX н/м',
            data: [3537, 7310, 10779, 14489, 19016, 22490, 26881, 30669, 34445, 38173, 41816, 45458, 49111, 52763, 56417],
            backgroundColor: 'rgba(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'CAPEX н/и',
            data: [6, 33, 137, 142, 977, 104, 476, 0, 311, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(255, 29, 232)', 
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }
    ]
}

export const CurrentStrategyOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Текущая стратегия',
        }
  },
  scales: {
    y: {
        title: {
            display: true,
            title: 'Срок инвестиций, год'
        }
    },
    x: {
        title: {
            display: true,
            title: 'Стоимость инвестиций, руб'
        }
    }
  }
}

export const CurrentStrategyTwo = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [
        {
            label: 'NPV',
            data: [10.234, 23.438, 36.652, 49.866, 63.080, 76.294, 89.508, 102.722, 115.936, 129.150, 142.364, 155.578, 168.792, 182.006, 195.220],
            backgroundColor: 'rgba(255, 99, 232)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'NPV н/и',
            data: [10.104, 23.323, 36.527, 49.742, 63.056, 76.270, 89.484, 102.698, 115.912, 129.126, 142.340, 155.554, 168.768, 182.082, 195.296],
            backgroundColor: 'rgba(255, 29, 32)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }
    ]
}

export const CurrentStrategyOptionsTwo = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Текущая стратегия',
        }
  },
  scales: {
    y: {
        title: {
            display: true,
            title: 'Срок инвестиций, год'
        }
    },
    x: {
        title: {
            display: true,
            title: 'Стоимость инвестиций, руб'
        }
    }
  }
}