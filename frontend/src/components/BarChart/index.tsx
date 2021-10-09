import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleByStoreYear } from 'Types/dataTypes';
import { BarChartData } from 'Types/componentsTypes';
import axios from 'axios';
import { BASE_URL } from 'util/requests';

const BarChart = () => {
 
  const [chartData, setChartData] = useState<BarChartData>({
    xaxis: {
      categories: []
    },
    series: [
      {
        name: "",
        data: []
      }
    ]
  });

  const yearMinFucntion = (list: SaleByStoreYear[][]) => {
    let yearMin = list[0][0].year;
    list.map(x => x.map(element => yearMin >= element.year ? yearMin = element.year : 0));
    return yearMin;
  }

  const yearMaxFucntion = (list: SaleByStoreYear[][]) => {
    let yearMax = list[0][0].year;
    list.map(x => x.map(element => element.year >= yearMax ? yearMax = element.year : 0));
    return yearMax;
  }


  /*cria o eixo x com base no menor ano e maior ano encontrados no agrupamento */
  const createXaxis = (yearMin: number, yearMax: number) => {
    let xaxis = [];
    for (let i = yearMin; i <= yearMax; i++) {
      xaxis.push(i);
    }
    return xaxis;
  }

  /**cria a lista de objetos de dados a serem exibidos no gráfico */
  const createSeries = (xaxis: Number[], list: SaleByStoreYear[][]) => {
    let series = [];
    for (let i = 0; i < list.length; i++){
      //let obj = list[i];
      let data = xaxis.map(x => 0);
      let name =  list[i][0].storeName;
      list[i].forEach(item =>
        data[xaxis.indexOf(item.year)] = item.sum
      );

      series.push({ name, data });
    }

    return series;
  }

 

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/by-store-year`).then((response) => {
      const data = response.data as SaleByStoreYear[][];
      const Xaxis = createXaxis(yearMinFucntion(data), yearMaxFucntion(data));
      const mySeries = createSeries(Xaxis, data);
      setChartData({ xaxis: { categories: Xaxis }, series: mySeries });
      console.log(Xaxis);
      console.log(mySeries);
    });
       
      }, []);

     
      const options = {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        title: {
          text: 'Total de vendas por ano',
          floating: false,
          style: {
            fontSize: '15px',
            fontWeight: 'bold',
            color: 'red'
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        yaxis: {
          title: {
            text: '$(Total de vendas em reais)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return "$ " + val + " reais";
            }
          }
        },
        dataLabels: {
          enabled: false
        }
      };

      return (
        <>
          <Chart
            options={{ ...options, xaxis: chartData.xaxis }}
            series={chartData.series}
            type='bar'
            height='390' />
        </>
      );
    }

export default BarChart;
