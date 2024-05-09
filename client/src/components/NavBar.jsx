import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";

function NavBar() {

  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
  }

  return (
    <nav className="navbar">
      
        <NavLink to="/"><h1 className="logo">Fade</h1></NavLink>

        <div className="nav-link">

          <div className="barbers-button">
            <NavLink
            to="/barbers"
            >Barbers</NavLink>
          </div>

          
          <div className="login-button" onClick={handleLoginClick} >
            <NavLink
                to="/login"
            >Login</NavLink>
          </div>
          
          <div className="logout-button" >
            <NavLink 
                to="/logout"
            >Logout</NavLink>
          </div>
        </div>
    </nav>
  );
};

export default NavBar;