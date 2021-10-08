import './styles.css';
import Logo from "assets/img/logo.svg";
import MenuG from './MenuGraphics';
import MenuC from './MenuRecords';

const NavBar = () => {

    return (
        <nav className="main-nav" >
            <div>
                <ul>
                    <li><img src={Logo} alt="icone" height="40px" /></li>
                    <li><a href="/">Home</a></li>
                    <li> <MenuC /></li>
                    <li> <MenuG /></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
