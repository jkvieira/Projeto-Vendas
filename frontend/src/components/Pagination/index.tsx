import { PageProps } from "Types/componentsTypes";
import './styles.css';


const Pagination = ({ page, onPageChange }: PageProps) => {

    return (
        <div>
            <nav >
                <ul className="pagination">
                    <li >
                        <button disabled={page.first} className={!page.first ? 'active' : ''} onClick={() => onPageChange(0)}>Primeira</button>
                    </li>
                    <li >
                        <button disabled={page.first} className={!page.first ? 'active' : ''} onClick={() => onPageChange(page.number - 1)}>&laquo;</button>
                    </li>

                    <li>
                        <span>{page.number + 1}</span>
                    </li>

                    <li >
                        <button disabled={page.last} className={!page.last ? 'active' : ''} onClick={() => onPageChange(page.number + 1)}>&raquo;</button>
                    </li>

                    <li>
                        <button disabled={page.last} className={!page.last ? 'active' : ''} onClick={() => onPageChange(page.totalPages - 1)}>Última</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
