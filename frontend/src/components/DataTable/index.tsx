import './styles.css';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { SalePage } from 'Types/dataTypes';
import { formatLocalDate } from "util/dateApi";
import { SelectStores } from 'Types/componentsTypes';
import { getStores, getSales } from 'requestsApi';
const DataTable = () => {

    const [activePage, setActivePage] = useState(0);
    const [filterName, setFilterName] = useState('Todos');
    /*Controla o estado inicial da lista de lojas*/
    const [listStores, setListStores] = useState<SelectStores>({ allStores: [] });
    const [page, setPage] = useState<SalePage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });
    /*Obtem a resposta do servidor e seta as lojas */
    useEffect(() => {
        getStores(setListStores);
    }, []);

    useEffect(() => {
        getSales(setPage, filterName, activePage);
    }, [activePage, filterName]);

    const changePage = (index: number) => {
        setActivePage(index);
    }

    const ChangeFilter = (e: { target: { value: any }; }) => {
        setFilterName(e.target.value);
        changePage(0);
    }


    return (
        <>
            <div className="contextHeaderTable">
                <h2>Tabela Registros de Vendas</h2>
                <label>Filtro: </label>
                <select required name="selectStore" onChange={ChangeFilter}>
                    <option value="Todos">Todos</option>
                    {listStores.allStores.map(item => (
                        <option key={item.id} value={item.name}>{item.name}</option>
                    ))}
                </select>
                <Pagination page={page} onPageChange={changePage} />
            </div>
            <div className="tableResponsive">
                <table id="customers">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Volume</th>
                            <th>total ($)</th>
                            <th>Loja</th>
                            <th>Método de Pagamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {page.content?.map(item => (
                            <tr key={item.id}>
                                <td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
                                <td>{item.volume}</td>
                                <td>{item.total.toFixed(2)}</td>
                                <td>{item.store.name}</td>
                                <td>{item.paymentMethod.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DataTable;


