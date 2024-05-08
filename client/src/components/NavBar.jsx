import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      
        <NavLink to="/"><h1 className="logo">Fade</h1></NavLink>

        <div className="nav-link">

          <div className="barbers-button">
            <NavLink
            to="/barbers"
            >Barbers</NavLink>
          </div>

          <div className="login-button">
            <NavLink
                to="/login"
            >Login</NavLink>
          </div>
        </div>
    </nav>
  );
};

export default NavBar;