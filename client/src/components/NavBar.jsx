import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
        <h1 className="logo">Fade</h1>

        <div className="nav-link">
        <NavLink
        to="/barbers"
        >Barbers</NavLink>
      
        <NavLink
            to="/login"
        >Login</NavLink>
        </div>
    </nav>
  );
};

export default NavBar;