import './styles.css';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

const MenuRecords = () => {
    return (
        <Dropdown className="dropdown">
            <DropdownTrigger className="dropbtn">Cadastros</DropdownTrigger>
            <DropdownContent className="dropdown-content">
                <ul>
                    <li><a href="/recordByStore">Cadastro de vendas</a></li>
                </ul>
            </DropdownContent>
        </Dropdown>
    );
}

export default MenuRecords;