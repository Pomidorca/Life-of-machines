export const ChangesStructureKFV = {
    labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    datasets: [{
            label: 'Время в работе',
            data: [],
            backgroundColor: '#497daa',
            fill: true,
        },
        {
            label: 'План. простои',
            data: [],
            backgroundColor: '#848484',
            fill: true,
        },
        {
            label: 'Неплан.простои',
            data: [],
            backgroundColor: '#325aa3',
            fill: true,
        },
        {
            label: 'Прочие простои',
            data: [],
            backgroundColor: '#1c4d73',
            fill: true,
        },
        {
            label: 'Кио',
            data: [],
            backgroundColor: '#c10016',
            fill: false,
        },
    ],
};

export const ChangesStructureKFVOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        title: {
            display: true,
            text: 'Изменения структуры КФВ среднесписочной единицы техники',
            font: {
                size: 20,
            },
        },
        legend: {
            position: 'bottom',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            stacked: true,
        },
        'y-cost': {
            type: 'linear',
            position: 'right',
        },
    },
};

export const StructureKFV = {
    labels: ['Время в работе', 'Плановые простои', 'Неплановые простои', 'Прочее'],
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
            text: 'Структура КФВ среднесписочной единицы техники',
            font: {
                size: 20
            }
        }
    }
}

export const detailedStructureCfvOne = {
    labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    datasets: [{
            label: ['Время в работе'],
            data: [3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500],
            backgroundColor: '#7f8686',
        },
        {
            label: ['Плановые простои'],
            data: [3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000],
            backgroundColor: '#184d75',
        }
    ]
}

export const detailedStructureCfvOneOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom'
        },
    }
}

export const detailedStructureCfvTwo = {
    labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    datasets: [{
            label: ['Время в работе'],
            data: [3500, 1700, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000],
            backgroundColor: '#7f8686',
        },
        {
            label: ['Плановые простои'],
            data: [300, 700, 250, 100, 300, 700, 250, 100, 300, 700, 250],
            backgroundColor: '#184d75',
        }
    ]
}

export const detailedStructureCfvTwoOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom'
        },
    }
}

export const detailedStructureCfvThree = {
    labels: ['Прочии', 'Отсутствие топлива', 'Ремонт экскаватора', 'Концервация', 'Ожидание погрузки', 'Ожидание заправки', 'Блокировка проехжей части', 'Прочии', 'Отсутствие топлива', 'Ремонт экскаватора', 'Концервация', 'Ожидание погрузки', 'Ожидание заправки', 'Блокировка проехжей части'],
    datasets: [{
        label: ['2021'],
        data: [3500, 1700, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 5000, 1200, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000],
        backgroundColor: '#c35e1c',
    }]
}

export const detailedStructureCfvThreeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
}

export const ChangeOperatingTime = {
    labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [{
            label: 'Удельное накопленные затраты, руб./т.км',
            data: [23, 13, 10, 9, 9, 8, 5, 2, 1, 4, 3, 7, 8, 12, 16, 18, 19, 20, 19, 23],
            backgroundColor: 'rgba(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 1)',
        },
        {
            label: 'Удельные накопленные затраты на ТО и ТР, руб./т.км',
            data: [25, 15, 12, 11, 11, 10, 7, 4, 3, 6, 5, 9, 10, 14, 18, 20, 21, 22, 21, 25],
            backgroundColor: 'rgba(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 1)',
        }
    ]
}

export const ChangeOperatingTimeOptions = {
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
            position: 'bottom'
        }
    },
}