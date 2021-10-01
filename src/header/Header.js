import logo from '../assets/images/SBAT.png'
import './Header.css';
function Header(props) {

    return (
        <header className="header-section">
            <img width="100" height="100" src={logo} />
            <h1 className="title-cls">Sri Bhakta Anjaneya Temple</h1>
        </header>
    )
}

export default Header;


