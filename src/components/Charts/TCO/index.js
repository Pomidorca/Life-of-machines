import { scales } from "chart.js"

export const PerformanceChange = {
    labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [
        {
            label: 'Производительность млн.ткм',
            data: [5.68, 4.78, 4.26, 3.69, 4.17, 3.68, 6.70, 6.01, 6.49, 5.49, 5.27, 5.16, 5.50, 4.33, 4.34], 
            backgroundColor: '#ff8926',
            borderColor: '#ff8926',
            type: 'line',
            yAxisID: 'y-cost',
        },
        {
            label: 'Удельные накопленные затраты руб/ед',
            data: [24.05, 12.18, 9.92, 8.59, 8.90, 8.88, 8.85, 8.84, 8.82, 8.81, 8.80, 8.79, 8.78, 8.77, 8.76],
            backgroundColor: 'rgba(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 1)',
            type: 'line',
        }
    ]
}

export const PerformanceChangeOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Изменение производительности и удельных накопительных затрат от срока эксплуатации',
            font: {
                size: 20
            }
        }
    },
    scales: {
        'y-cost': {
            type: 'linear',
            position: 'right',
        }
    }
}

export const ComparisonActualCosts = {
    labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [
        {
            label: 'Затраты на ТР. факт',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
            backgroundColor: '#64c824',
            borderColor: '#64c824',
            type: 'line',
        },
        {
            label: 'Затраты на ТР. регламент',
            data: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '43', '14 ', '15', '16'],
            backgroundColor: '#64c824',
            borderColor: '#64c824',
            borderDash: [5, 5],
            type: 'line',
        },
        {
            label: 'Затраты на ТР. факт',
            data: ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
            backgroundColor: '#ff8926',
            borderColor: '#ff8926',
            type: 'line',
        },
        {
            label: 'Затраты на ТР. регламент',
            data: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
            backgroundColor: '#ff8926',
            borderColor: '#ff8926',
            borderDash: [5, 5],
            type: 'line',
        }
    ]
}

export const ComparisonActualCostsOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Сравнение фактических затрат на ТО и ТР с регламентными, млн. руб.',
            font: {
                size: 20
            }
        }
    },
}

export const ChangingOpeningHours = {
    labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [
        {
            label: 'Время работы, час',
            data: [4608, 7743, 6293, 4862, 4352, 4650, 4492, 4512, 4608, 4608, 4608, 4608, 4608, 4608, 4608],
            backgroundColor: '#686c71',
            borderColor: '#686c71', 
            type: 'line',
        },
    ]
}

export const ChangingOpeningHoursOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Изменение времени работы на линии самосвала от срока эксплуатации',
            font: {
                size: 20
            }
        }
    },
}

export const ComparisonOperational = {
    labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [
        {
            label: 'Производительность млн.ткм',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 
            backgroundColor: '#ff8926',
            borderColor: '#ff8926',
            type: 'line',
            yAxisID: 'y-cost',
        },
        {
            label: 'Удельные накопленные затраты руб/ед',
            data: [2, 8, 10, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 14, 14],
            backgroundColor: 'rgba(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 1)',
            type: 'line',
        }
    ]
}

export const ComparisonOperationalOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Сравнение эксплуатационных и затрат на ТО и Р',
            font: {
                size: 20
            }
        }
    },
    scales: {
        'y-cost': {
            type: 'linear',
            position: 'right',
            }
        }
    }