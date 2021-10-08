export type SalePage ={
    content?: Sale[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?:number;
    empty?: boolean;
}

export type Sale = {
    id?: number;
    date: string;
    volume: number;
    total: number;
    store: Store;
    paymentMethod: PaymentMethod;

}

export type SaleByStore = {
    sum : number;
    storeName: string;
}

export type SaleByStoreYear = {
    storeName: string;
    year: number;
    sum : number;
   
}

export type PaymentMethod = {
    id : number;
    description: string;
}

export type Store = {
    id : number;
    name: string;
}
