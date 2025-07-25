/**
 * adaptive text
 * example: clampFontSize(context.chart, min: n (px), period: n (wv), max: n (px))
 * @param chart
 * @param minPx
 * @param vwRatio
 * @param maxPx
 * @returns {number}
 */
function clampFontSize(chart, minPx, vwRatio, maxPx) {
    const viewportWidth = chart.width;
    const viewportRatio = vwRatio / 100;
    const calculatedSize = viewportWidth * viewportRatio;

    return Math.min(
        maxPx,
        Math.max(
            minPx,
            calculatedSize
        )
    );
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
    datasets: [
        {
            label: 'Значение показателя',
            data: [2, 17, 22, 12, 2, 17, 22, 12, 42, 37, 22, 62],
            backgroundColor: 'rgba(54, 162, 235, 1)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            pointRadius: 0,
        },
        {
            label: 'Фон',
            data: new Array(12).fill(100),
            backgroundColor: 'rgba(200, 200, 200, 0.3)',
            borderWidth: 1,
            pointRadius: 0,
            datalabels: { display: false }
        },
    ]
}

export const ActualAccidentRateOptions = {
    id: 'actualAccidentRateChart',
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    scales: {
        y: {
            stacked: true,
            beginAtZero: true,
            // max: 1,
        },
        x: {
            stacked: true,
        },
    },
    plugins: {
        datalabels: {
            display: true,
            formatter: function(value) {
                return  ((1 - value) * 100).toFixed(0) + '%';
            },
            font: (context) => ({
                family: 'Arial',
                size: clampFontSize(context.chart, 14, 3, 24),
                weight: 'bold'
            }),
            anchor: 'end',
            align: 'end',
            offset: 10,
            clip: true
        },
        tooltip: {
            enabled: true,
            filter: function (tooltipItem) {
                return tooltipItem.datasetIndex === 0
            }
        },
        title: {
            display: true,
            text: 'Коэффициент аварийности фактический (КАФ)',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'none'
        },
        // id: 'arrowIconPlugin',
        // afterDatasetsDraw(chart, args, options) {
        //     console.log(chart.config._config.options.id)
        //     if (chart.id !== 'actualAccidentRateChart') return;
        //     const {ctx, data} = chart;
        //     const meta = chart.getDatasetMeta(0);
        //
        //     meta.data.forEach((bar, index) => {
        //         const x = bar.x;
        //         const y = bar.y - 20;
        //
        //         ctx.save();
        //         ctx.font = '16px Arial';
        //         ctx.textAlign = 'center';
        //         ctx.fillText('▼', x, y);
        //         ctx.restore();
        //     });
        // }
    },
}

export const OrganizationOfRepairs = {
    labels: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    datasets: [
        {
            label: 'Значение показателя',
            data: [49, 23, 10, 26, 16, 49, 2, 12, 39, 28, 35, 10],
            backgroundColor: 'rgba(54, 162, 155)',
            borderColor: 'rgba(255, 99, 132)',
            fill: false,

        },
        {
            label: 'Значение показателя',
            data: [49, 23, 10, 26, 16, 49, 2, 12, 39, 28, 35, 10],
            backgroundColor: 'rgb(54,85,162)',
            borderColor: 'rgb(216,99,255)',
            fill: false,
        },
    ]
}

export const OrganizationOfRepairsOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        datalabels: {
            display: true,
            formatter: function(value) {
                if(value === 0) return '';
                return  ((1 - value) * 100).toFixed(2) + '%';
            },
            anchor: 'end',
            align: 'top',
            clip: true,
        },
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
    },
    scales: {
        y: {
            stacked: false,
            beginAtZero: true,
        },
        x: {
            stacked: true,
        },
    },
}

export const WorkPlanningIndicator = {
    labels: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    datasets: [
        {
            label: 'Значение показателя',
            data: [49, 23, 10, 26, 16, 49, 10, 20, 39, 28, 35, 10],
            backgroundColor: 'rgba(54, 162, 100)',
            borderColor: 'rgba(255, 99, 132)',
            fill: false,
            tension: 0.1
        },
        {
            label: 'Значение показателя',
            data: [49, 23, 10, 26, 16, 49, 10, 20, 39, 28, 35, 10],
            backgroundColor: 'rgba(54, 162, 100)',
            borderColor: 'rgba(255, 99, 132)',
            fill: false,
            tension: 0.1
        },
    ]
}

export const WorkPlanningIndicatorOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        datalabels: {
            display: true,
            formatter: function(value) {
                if(value === 0) return '';
                return  value.toFixed(0);
            },
            anchor: 'end',
            align: 'top',
            clip: true,
        },
        title: {
            display: true,
            text: 'Суммарные аварийные простои, ч',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'bottom'
        }
    },
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
        datalabels: {
            display: true,
            formatter: function(value) {
                if(value === 0) return '';
                return  value.toFixed(0);
            },
            anchor: 'end',
            align: 'top',
            clip: true,
        },
        title: {
            display: true,
            text: 'Среднее время восстановления (MTTR), ч',
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

export const NumberOfRefunds = {
    labels: ['Март', 'Апрель', 'Май', 'Июнь'],
    datasets: [{
        label: 'Самосвал',
        data: [357, 211, 200, 150],
        backgroundColor: 'rgba(54, 162, 235)',
        borderColor: 'rgba(255, 99, 132)',
        fill: false,
        tension: 0.1
    }
    ]
}

export const NumberOfRefundsOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        datalabels: {
            display: true,
            anchor: 'end',
            align: 'top',
            clip: true,
        },
        title: {
            display: true,
            text: 'Среднее время между отказами',
            position: 'left',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'null'
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

export const NumberOfBreakdownsByFaultName = {
    labels: ['Март', 'Апрель', 'Май', 'Июнь'],
    datasets: [{
        label: 'Самосвал',
        data: [357, 211, 200, 150],
        backgroundColor: 'rgba(54, 162, 235)',
        borderColor: 'rgba(255, 99, 132)',
        fill: false,
        tension: 0.1
    }
    ]
}

export const NumberOfBreakdownsByFaultNameOptions = {
    responsive: true,
    maintainAspectRatio: false,
    minHeight: 400,
    plugins: {
        datalabels: {
            display: true,
            anchor: 'end',
            align: 'end',
            clip: false,
            offset: 30
        },
        title: {
            display: false,
            text: 'Среднее время между отказами',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'null'
        }
    },
    indexAxis: 'y',
    scales: {
        y: {
            stacked: true,
            beginAtZero: true,
            grid: {
                display: false
            }
        },
        x: {
            stacked: true,
            grid: {
                display: true,
                line: {
                    borderDash: [10, 10],
                    color: '#CCCCCC',
                },
            },
        },
    },
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
    }, ]
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

            }
        },
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