import React from 'react';
import { createOption } from './mapOptionTool';
import Highcharts from 'highcharts';
import Tilemap from 'highcharts/modules/tilemap'
import Heatmap from 'highcharts/modules/heatmap'
import HighchartsReact from 'highcharts-react-official';
Heatmap(Highcharts)
Tilemap(Highcharts)

const PositiveCasesTilemap = ({ data, date }) => {

    const chartData = createOption(data)

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
                to: 1000000,
                color: '#F9EDB3',
                name: '< 1M'
            }, {
                from: 1000000,
                to: 5000000,
                color: '#FFC428',
                name: '1M - 5M'
            }, {
                from: 5000000,
                to: 20000000,
                color: '#FF7987',
                name: '5M - 20M'
            }, {
                from: 20000000,
                color: '#FF2371',
                name: '> 20M'
            }]
        },

        tooltip: {
            headerFormat: '',
            pointFormat: 'The positive cases of <b> {point.name}</b> is <b>{point.value}</b>'
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
            data: chartData
        }]
    }

    return (
        <div className='container'>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div >
    );
}

export default PositiveCasesTilemap;
