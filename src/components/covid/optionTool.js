import originMapData from "./mapOption.json"


export const createOption = (data, date) => {
    const copyData = originMapData

    data.map(item => {
        if (item.state in copyData) {
            copyData[item.state].value = item.positive
        }
    })

    const options = {
        chart: {
            type: 'tilemap',
            inverted: true,
            height: '80%',
            backgroundColor: 'transparent',
        },

        accessibility: {
            description: "A tile map representing the covid cases in each state of U.S",
            screenReaderSection: {
                beforeChartFormat:
                    '<h5>{chartTitle}</h5>' +
                    '<div>{chartSubtitle}</div>' +
                    '<div>{chartLongdesc}</div>' +
                    '<div>{viewTableButton}</div>'
            },
            point: {
                valueDescriptionFormat: '{index}. {xDescription}, {point.value}.'
            }
        },

        title: {
            text: 'U.S covid positive cases on ' + date
        },

        xAxis: {
            visible: false
        },

        yAxis: {
            visible: false
        },

        colorAxis: {
            dataClasses: [{
                from: 0,
                to: 100000,
                color: '#F9EDB3',
                name: '< 100K'
            }, {
                from: 100000,
                to: 500000,
                color: '#FFC428',
                name: '100K - 500k'
            }, {
                from: 500000,
                to: 2000000,
                color: '#FF7987',
                name: '500k - 2M'
            }, {
                from: 2000000,
                color: '#FF2371',
                name: '> 2M'
            }]
        },

        tooltip: {
            formatter: function () {
                if (this.point.value == 0) {
                    return "No data for <b>" + this.point.name + "</b>"
                } else {
                    return "The positive cases of <b>" + this.point.name + "</b> is <b>" + this.point.value + "</b>"
                }
            },
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.hc-a2}',
                    color: '#000000',
                    style: {
                        textOutline: false
                    }
                }
            }
        },

        series: [{
            name: '',
            data: Object.values(copyData)
        }]
    }

    return options
}

export const createTopOption = (data, date) => {
    const copyData = data.slice()
    copyData.sort((a, b) => b.probableCases - a.probableCases)
    const topData = copyData.slice(0, 5)
    debugger
    const options = {
        chart: {
            type: 'bar',
            backgroundColor: "transparent"
        },
        title: {
            text: 'Top 5 most probable cases'
        },
        xAxis: {
            categories: topData.map(item => item.state),
            title: {
                text: 'State',
            },
        },
        yAxis: {
            min: 0,
            title: null,
        },
        series: [{
            name: 'number of cases',
            data: topData.map(item => item.probableCases),
        }],
    }
    return options
}