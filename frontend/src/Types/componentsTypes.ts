import { SalePage } from "Types/dataTypes";
import { Store } from 'Types/dataTypes';
import { PaymentMethod } from 'Types/dataTypes';


export type SelectStores = {
    allStores: Store[];
}

export type SelectPaymentMethods = {
    allPaymentMethods: PaymentMethod[];
}

export type PageProps = {
    page: SalePage;
    onPageChange: Function;
}

export type DonutChartData = {
    labels: string[];
    series: number[];
}

export type SeriesData = {
    name: string;
    data: number[];
  }
  
 export type BarChartData = {
    xaxis: {
      categories: number[]
    };
    series: SeriesData[];
  }