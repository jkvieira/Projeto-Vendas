import './styles.css';
import Dropdown, { DropdownTrigger, DropdownContent} from 'react-simple-dropdown';

const MenuGraphics = () => {
    return (
        <Dropdown className="dropdown">
        <DropdownTrigger className="dropbtn">Gráficos</DropdownTrigger>
        <DropdownContent className="dropdown-content">
            <ul>
                <li><a href="/dashboard">Dashboard</a></li>
            </ul>
        </DropdownContent>
    </Dropdown>
    );
}

export default MenuGraphics;