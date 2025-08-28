import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar-container">
            <Link to="/" className="logo">
                <img src={logo} alt="A decorative A and B character intertwined, denoting Aspen and Ben's wedding logo" />
            </Link>
            <ul className="nav-links">
                <li><Link to="/">
                    Home
                </Link></li>
                <li>
                    <Link to="/rsvp">
                        RSVP
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;