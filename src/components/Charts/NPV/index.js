export const strategy = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [{
        label: 'Количество экскаваторов',
        data: [1, NaN, 2, 1, 1, NaN, NaN, NaN, NaN, 1, NaN, 1, NaN, 3, NaN, 1],
        backgroundColor: 'rgba(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
}

export const strategyOptions = {
    responsive: false,
    maintainAspectRatio: false,
    height: 500,
    width: 500,
    plugins: {
        legend: {
            position: 'null'
        },
    }
}

export const strategyTwo = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [{
        label: 'Количество самосвалов',
        data: [NaN, NaN, 1, 2, 4, 6, 15, 3, NaN, NaN, 2, 5, 1, 4, NaN, NaN],
        backgroundColor: 'rgba(255, 29, 232)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
}

export const strategyTwoOptions = {
    responsive: false,
    maintainAspectRatio: false,
    height: 1000,
    width: 1000,
    plugins: {
        legend: {
            position: 'null'
        },
    }
}

export const strategyThree = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [{
        label: 'Количество самосвалов',
        data: [1, NaN, 2, 1, 1, NaN, NaN, 3, NaN, NaN, 2, 1, 1, 4, NaN, NaN],
        backgroundColor: 'rgba(255, 29, 232)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
}

export const strategyThreeOptions = {
    responsive: false,
    maintainAspectRatio: true,
    height: 500,
    width: 500,
    plugins: {
        legend: {
            position: 'null'
        },
    }
}

export const CurrentStrategy = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [{
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
            position: 'null'
        },
        title: {
            display: true,
            text: 'Динамика OPEX',
            font: {
                size: 20
            }
        }
    },
}

export const CurrentStrategyTwo = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [{
            label: 'NPV',
            data: [10.234, 23.438, 36.652, 49.866, 63.080, 76.294, 89.508, 102.722, 115.936, 129.150, 142.364, 155.578, 168.792, 182.006, 195.220],
            backgroundColor: 'rgba(255, 99, 232)',
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

export const CurrentStrategyTwoOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'null'
        },
        title: {
            display: true,
            text: 'Динамика CAPEX',
            font: {
                size: 20
            }
        }
    },
}

export const PresentValue = {
    labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033'],
    datasets: [{
            label: '',
            data: [5599, 6847, 6308, 5639, 4567, 4653, 3120, 3162, 2712, 2128],
            backgroundColor: 'rgba(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: '',
            data: [5599, 12446, 18754, 24392, 28959, 33512, 36733, 39894, 42607, 44735],
            backgroundColor: 'rgba(255, 29, 232)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }
    ]
}

export const PresentValueOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'null'
        },
        title: {
            display: true,
            text: 'Чистый дисконтированный доход',
            font: {
                size: 20
            }
        }
    }
}

export const ChDD = {
    labels: ['B1', 'B2', 'B3', 'B4', 'B5'],
    datasets: [{
        label: '',
        data: [44735, 44977, 46256, 46834, 54541],
        backgroundColor: '#979dac',
        borderColor: '#979dac',
        borderWidth: 1
    }]
}

export const ChDDOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        legend: {
            position: 'null'
        },
        title: {
            display: true,
            text: 'ЧДД накопительным итогом 2033 году. млн. р.',
            font: {
                size: 20
            }
        }
    }
}