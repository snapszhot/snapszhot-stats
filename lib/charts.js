const scaleOptions = {
    grid: {
        display: false,
    },
    ticks: {
        precision: 0,
    },
    title: {
        color: '#545454',
        display: true,
        font: {
            weight: 600,
        },
    },
}

const baseOptions = {
    animations: false,
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
        title: {
            align: 'start',
            display: true,
            font: {
                size: 18,
            },
            padding: {
                bottom: 24,
            },
        },
    },
    scales: {
        x: {
            ...scaleOptions,
            title: {
                ...scaleOptions.title,
                text: 'Frame',
            },
        },
        y: {
            ...scaleOptions,
            title: {
                ...scaleOptions.title,
                text: '# of wins',
            },
        },
    },
}

export const winsByFrameOptions = {
    ...baseOptions,
    plugins: {
        ...baseOptions.plugins,
        title: {
            ...baseOptions.plugins.title,
            text: 'Wins by Frame',
        },
    },
}

export const winsLossesOptions = {
    ...baseOptions,
    indexAxis: 'y',
    plugins: {
        ...baseOptions.plugins,
        title: {
            ...baseOptions.plugins.title,
            text: 'Wins and Losses',
        },
    },
}
