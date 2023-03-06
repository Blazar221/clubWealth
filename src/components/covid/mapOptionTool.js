import originMapData from "./mapOption.json"


export const createOption = (data, date) => {
    const copyData = originMapData
    debugger
    data.map(item => {
        if (item.state in copyData) {
            copyData[item.state].value = item.positive
        }
    })

    const options = {
        chart: {
            type: 'tilemap',
            inverted: true,
            height: '80%'
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