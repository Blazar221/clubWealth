import React from 'react';
import { createOption } from './mapOptionTool';
import Highcharts from 'highcharts';
import Tilemap from 'highcharts/modules/tilemap'
import Heatmap from 'highcharts/modules/heatmap'
import HighchartsReact from 'highcharts-react-official';
Heatmap(Highcharts)
Tilemap(Highcharts)

const PositiveCasesTilemap = ({ data, date }) => {

    const options = createOption(data, date)

    return (
        <div className='container'>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div >
    );
}

export default PositiveCasesTilemap;
