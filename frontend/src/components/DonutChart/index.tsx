import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { DonutChartData } from 'Types/componentsTypes';
import { getSalesByStore } from 'requestsApi';


const DonutChart = () => {
   
    const [chartData, setChartData]= useState<DonutChartData>({
        labels: [],
        series: [],
    });
    
    useEffect(()=>{
        getSalesByStore(setChartData);
    }, []);

    const options = {
        legend: {
            show: true
        },
        title:{
            text: 'Total de vendas',
            floating: false,
            style: {
              fontSize:  '15px',
              fontWeight: 'bold',
              color:  'red'
            }
        }
    }
    
    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="290"
        />
    );
}

export default DonutChart;
