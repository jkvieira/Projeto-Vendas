/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleByStoreYear } from 'Types/dataTypes';
import { BarChartData } from 'Types/componentsTypes';
import './styles.css';
import { getSalesByStoreYear } from 'requestsApi';

const BarChart = () => {
  const [responseData, setResponseData] = useState<SaleByStoreYear[][]>([]);
  const [Xaxis, setXaxis] = useState<number[]>([]);
  const [yearMinSubPlot, setYearMinSubPlot] = useState<number>(0);
  const [yearMaxSubPlot, setYearMaxSubPlot] = useState<number>(0);
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
      let obj = list[i];
      let data = xaxis.map(x => 0);
      let name = obj ? obj[0].storeName : "error";
      obj?.map(item =>
        data[xaxis.indexOf(item.year)] = item.sum
      );

      series.push({ name, data });
    }

    return series;
  }

   /* inicializa o eixo x do gráfico*/
  const initXaxis = (data: SaleByStoreYear[][] ) =>{
    const yearMin = yearMinFucntion(data);
    const yearMax = yearMaxFucntion(data);
    setYearMinSubPlot(yearMin);
    setYearMaxSubPlot(yearMax);
    setXaxis(createXaxis(yearMin, yearMax));
  }

  useEffect(() => {
    getSalesByStoreYear( setResponseData, initXaxis);
  }, []);

  /*permite alterar o estado da exibição do gráfico quando faixa de
   anos é modificada pelo usuário */ 
  useEffect(() => {
    const subXaxis = createXaxis(yearMinSubPlot, yearMaxSubPlot);
    const mySeries = createSeries(subXaxis, responseData);
    setChartData({ xaxis: { categories: subXaxis }, series: mySeries });
  }, [yearMinSubPlot, yearMaxSubPlot]);

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
          return "$ " + val + " reais"
        }
      }
    },
    dataLabels: {
      enabled: false
    }
  }

  const myChangeHandler = (e: { target: { value: any; name: any }; }) => {
    if (e.target.name === "selectYearMin") {
      setYearMinSubPlot(Number(e.target.value));
    }
    if (e.target.name === "selectYearMax") {
      setYearMaxSubPlot(Number(e.target.value));
    }
  }

  return (
    <>
      <div className="contextHeaderChart">
        <h2>Selecione uma faixa de exibição para o gráfico </h2>
        <label>Ano mínimo </label>
        <select  name="selectYearMin" onChange={myChangeHandler}>
         {Xaxis.map((item)=>
            <option key={item} value={item}>{item}</option>)}
        </select>
        <label>Ano máximo </label>
        <select name="selectYearMax" onChange={myChangeHandler}>
          {Xaxis.map(item =>
            <option key={item} value={item}>{item}</option>
          )}
        </select>
        <br/>
      </div>
      <Chart
        options={{ ...options, xaxis: chartData.xaxis }}
        series={chartData.series}
        type='bar'
        height='390'
      />
    </>
  );
}

export default BarChart;
