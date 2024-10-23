import React from 'react';
import CanvasJSReact from '@canvasjs/react-stockcharts';
import Diamond from '../../assets/pl-monthly.png';
// Sample data processing
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;


const CandleChart = () => {
    const options = {
        color: "yellow",
        theme: "dark2", // "light2", "dark1", "dark2"
      title: {
        text: ""
      },
      charts: [{
        data: [{
            type: "column",
            color: "yellow",
           
            showInLegend: false, 
            legendMarkerType: "none",
           
          dataPoints: [
            { x: new Date("2018-01-01"), y: 71 },
            { x: new Date("2018-02-01"), y: 55 },
            { x: new Date("2018-03-01"), y: 50 },
            { x: new Date("2018-04-01"), y: 65 },
            { x: new Date("2018-05-01"), y: 95 },
            { x: new Date("2018-06-01"), y: 68 },
            { x: new Date("2018-07-01"), y: 28 },
            { x: new Date("2018-08-01"), y: 34 },
            { x: new Date("2018-09-01"), y: 14 },
            { x: new Date("2018-10-01"), y: 71 },
            { x: new Date("2018-11-01"), y: 55 },
            { x: new Date("2018-12-01"), y: 50 },
            { x: new Date("2019-01-01"), y: 34 },
            { x: new Date("2019-02-01"), y: 50 },
            { x: new Date("2019-03-01"), y: 50 },
            { x: new Date("2019-04-01"), y: 95 },
            { x: new Date("2019-05-01"), y: 68 },
           
          ]
        }]
      }],
      navigator: {
        slider: {
          minimum: new Date("2018-07-01"),
          maximum: new Date("2019-06-30")
        }
      }
    };
  
    return (
      <div className='grapdh-img'>
        <img src={Diamond}/>
      </div>
    );
  };

export default CandleChart;
