export const KAWFACT = {
    labels: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    datasets: [{
        label: 'Значение показателя',
        data: [2, 17, 22, 12, 2, 17, 22, 12, 42, 37, 22, 62],
        backgroundColor: '#215e93',
        borderColor: '#215e93',
        fill: false,
        tension: 0.1
    }]
}

export const KAWFACTOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        title: {
            display: true,
            text: 'КАВфакт (Коэффициент аварийности фактический)',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'null'
        }
    }
}

export const MTBF = {
    labels: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    datasets: [{
        label: 'Значение показателя',
        data: [49, 23, 10, 26, 16, 49, 2, 12, 39, 28, 35, 10],
        backgroundColor: '#005a99',
        borderColor: '#005a99',
        fill: false,
        tension: 0.1
    }]
}

export const MTBFOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        title: {
            display: true,
            text: 'MTBF (Среднее время между отказами)',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'null'
        }
    }
}

export const MTTF = {
    labels: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    datasets: [{
        label: 'Значение показателя',
        data: [49, 23, 10, 26, 16, 49, 10, 20, 39, 28, 35, 10],
        backgroundColor: '#215e93',
        borderColor: '#215e93',
        fill: false,
        tension: 0.1
    }]
}

export const MTTFOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 300,
    plugins: {
        title: {
            display: true,
            text: 'MTTF (Среднее время до отказа)',
            font: {
                size: 20
            }
        },
        legend: {
            position: 'null'
        }
    }
}

export const ProbabilityOperation = {
    labels: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    datasets: [{
        label: 'Значение показателя',
        data: [49, 23, 10, 26, 16, 49, 10, 20, 39, 28, 35, 10],
        backgroundColor: '#215e93',
        borderColor: '#215e93',
        fill: false,
        tension: 0.1
    }]
}

export const ProbabilityOperationOptions = {
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
            position: 'null'
        }
    }
}