import React from 'react';
import Chart from 'react-apexcharts';

const Candlestick = ({ data, stock }) => {
  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    xaxis: {
      type: 'datetime'
    },
    title: {
      text: `${stock ? stock.name : 'Stock'} Price Movement`,
      align: 'left'
    }
  };

  return (
    <div id="chart">
      {data === null ? <p>Loading...</p> : <Chart options={options} series={data.series} type="candlestick" height={350} />}
    </div>
  );
};

export default Candlestick;
