import './styles.css';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleByStoreYear } from 'Types/dataTypes';
import { BarChartData } from 'Types/componentsTypes';
import { getSalesByStoreYear } from 'requestsApi';

const BarChart = () => {

  const [responseData, setResponseData] = useState<SaleByStoreYear[][]>([]);
  const [yearMinSubPlot, setYerMinSubPlot] = useState<number>(0);
  const [yearMaxSubPlot, setYerMaxSubPlot] = useState<number>(0);
  const [Xaxis, setXaxis] = useState<number[]>([]);
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
    for (let i = 0; i < list.length; i++) {
      let data = xaxis.map(x => 0);
      let name = list[i][0].storeName;
      list[i].forEach(item =>
        data[xaxis.indexOf(item.year)] = item.sum
      );

      series.push({ name, data });
    }

    return series;
  }

  useEffect(() => {
    getSalesByStoreYear(setResponseData, yearMinFucntion, yearMaxFucntion, setYerMinSubPlot, setYerMaxSubPlot, setXaxis, createXaxis);
  }, []);

  useEffect(() => {
    const subXaxis = createXaxis(yearMinSubPlot, yearMaxSubPlot);
    const mySeries = createSeries(subXaxis, responseData);
    setChartData({ xaxis: { categories: subXaxis }, series: mySeries });
  }, [responseData, yearMaxSubPlot, yearMinSubPlot]);

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

  const ChangeFilter = (e: { target: { value: any; name: any }; }) => {
    let nameClause = e.target.name;

    if (nameClause === "selectYearMin") {
      setYerMinSubPlot(Number(e.target.value));
    }

    if (nameClause === "selectYearMax") {
      setYerMaxSubPlot(Number(e.target.value));
    }
  }


  return (
    <>
      <div className="contextHeaderChart">
        <h2>Selecione uma faixa de anos para a exibição do gráfico</h2>
        <label>Ano mínimo </label>
        <select name="selectYearMin" onChange={ChangeFilter}>
          <option hidden>{yearMinSubPlot}</option>
          {Xaxis.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <label>Ano máximo </label>
        <select name="selectYearMax" onChange={ChangeFilter}>
          <option hidden>{yearMaxSubPlot}</option>
          {Xaxis.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <br />
      <Chart
        options={{ ...options, xaxis: chartData.xaxis }}
        series={chartData.series}
        type='bar'
        height='390' />
    </>
  );
}

export default BarChart;
