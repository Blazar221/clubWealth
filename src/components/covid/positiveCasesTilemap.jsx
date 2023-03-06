import React from 'react';
import { createOption } from './optionTool';
import Highcharts from 'highcharts';
import Tilemap from 'highcharts/modules/tilemap'
import Heatmap from 'highcharts/modules/heatmap'
import HighchartsReact from 'highcharts-react-official';
Heatmap(Highcharts)
Tilemap(Highcharts)

const PositiveCasesTilemap = ({ data, date }) => {

    const options = createOption(data, date)

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
}

export default PositiveCasesTilemap;
