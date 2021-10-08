import axios from 'axios';
import { BASE_URL } from 'util/requests';
import { Store, PaymentMethod, SaleByStore, SaleByStoreYear } from 'Types/dataTypes';
import { toast } from 'react-toastify';


export const getStores = async (setListStores: Function) => {
  axios.get(`${BASE_URL}/stores/list-stores`)
    .then(response => {
        const data = response.data as Store[];
        setListStores({ allStores: data });
    }).catch(() => {
       toast.error("Lojas não carregadas. Erro no servidor!");
    });
}

export const getPaymentMethods = async (setPaymentMethods: Function) => {
  axios.get(`${BASE_URL}/paymentMethods/list-paymentMethod`)
    .then(response => {
        const data = response.data as PaymentMethod[];
        setPaymentMethods({ allPaymentMethods: data });
    })
    .catch(() => {
       toast.error("Métodos de pagamentos não carregados. Erro no servidor!");
    });
}

export const saveSale = async (responseSale: any) => {
  axios.post(`${BASE_URL}/sales/new-sale`, responseSale)
    .then(() => {
      toast.success("Venda cadastrada com sucesso!");
    })
    .catch(() => {
      toast.error("Venda não cadastrada. Erro no servidor!");
    });
}

export const getSales = async (setPage: Function, filterName: string, activePage: number) => {
  axios.get(`${BASE_URL}/sales/find-sales?name=${filterName}&page=${activePage}&size=20&sort=date,desc`)
    .then(response => {
       setPage(response.data);
    })
    .catch(() => {
       toast.error("Registros de vendas não carregados. Erro no servidor!");
    });
}

export const getSalesByStore = async (setChartData: Function) => {
  axios.get(`${BASE_URL}/sales/by-store`)
   .then((response) => {
       const data = response.data as SaleByStore[];
       const myLabels = data.map(x => x.storeName);
       const mySeries = data.map(x => x.sum);
       setChartData({ series: mySeries, labels: myLabels});
    })
   .catch(() => {
       toast.error("Dados do gráfico não carregados. Erro no servidor!");
    });
}

export const getSalesByStoreYear = async ( setResponseData: Function, initXaxis: Function) =>{

  axios.get(`${BASE_URL}/sales/by-store-year`).then((response) => {
      const data = response.data as SaleByStoreYear[][];
      setResponseData(data);
      initXaxis(data);
    })
    .catch(() => {
      toast.error("Dados do gráfico não carregados. Erro no servidor!");
   });
}

