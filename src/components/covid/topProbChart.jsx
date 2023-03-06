import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { createTopOption } from './optionTool';

const TopProbChart = ({ data, date }) => {
    const options = createTopOption(data, date)
    
    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
}

export default TopProbChart;
