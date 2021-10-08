import './styles.css';
import { useState, useEffect } from 'react';
import { Store, Sale, PaymentMethod} from 'Types/dataTypes';
import { dateMax } from "util/dateApi";
import { SelectStores, SelectPaymentMethods} from 'Types/componentsTypes';
import { getStores, getPaymentMethods, saveSale } from 'requestsApi';


const Form = () => {
    const [listStores, setListStores] = useState<SelectStores>({ allStores: [] });
    const [listPaymentMethods, setPaymentMethods] = useState<SelectPaymentMethods>({ allPaymentMethods: [] });
    const [store, setStore] = useState<Store>({ id: 0, name: "" });
    const [date, setDate] = useState<string>("null");
    const [volume, setVolume] = useState<number>(0);
    const [total, setTotal] = useState<number>(0.0);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({ id: 0, description: "" });
    const [responseSale, setResponseSale] = useState<Sale>();


    useEffect(() => {
        getStores(setListStores);
    }, []);


    useEffect(() => {
        getPaymentMethods(setPaymentMethods);
    }, [listStores]);


    /*obtem os valores digitados pelo usuário*/
    const myChangeHandler = (e: { target: { value: any; name: any }; }) => {
        let nameClause = e.target.name;

        if (nameClause === "selectStore") {
            setStore({ id: Number(e.target.value), name: listStores.allStores[Number(e.target.value) - 1].name });
        }

        if (nameClause === "dateSale") {
            setDate(e.target.value);
        }

        if (nameClause === "volumeSale") {
            setVolume(Number(e.target.value));

        }

        if (nameClause === "totalSale") {
            setTotal(Number(e.target.value));

        }

        if (nameClause === "selectPaymentMethod") {
            setPaymentMethod({ id: Number(e.target.value), description: listPaymentMethods.allPaymentMethods[Number(e.target.value) - 1].description });
        }
    }
    
    useEffect(() => {
        setResponseSale({ date: date, volume: volume, total: total, store: store, paymentMethod: paymentMethod });
    }, [date, volume, total, store, paymentMethod]);

    const mySubmitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        saveSale(responseSale);
    }

    
    return (
        <div>
            <form className="contextForm" onSubmit={mySubmitHandler}>
                <div>
                    <label>Selecione uma Loja</label>
                    <select required name="selectStore" onChange={myChangeHandler}>
                        <option hidden></option>
                        {listStores.allStores.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>

                    <label>Digite o volume das vendas</label>
                    <input required type="number" name="volumeSale" step="1" min="0" onChange={myChangeHandler} />

                    <label>Digite o total de vendas</label>
                    <input required type="number" step="0.01" min="0" name="totalSale" onChange={myChangeHandler} />

                    <label>Selecione a data das vendas</label><br />
                    <input required type="date" name="dateSale" onChange={myChangeHandler} max={dateMax()} />

                    <label>Selecione o método de pagamento das vendas</label>
                    <select required name="selectPaymentMethod"  onChange={myChangeHandler}>
                        <option hidden></option>
                        {listPaymentMethods.allPaymentMethods.map(item => (
                            <option key={item.id} value={item.id.toString()}>{item.description}</option>
                        ))}
                    </select>
                    <button className="buttonForm" type="submit">Enviar</button>
                    <button className="buttonForm" type="reset">Limpar</button>
                </div>
            </form>
        </div>
    );

}
export default Form;


