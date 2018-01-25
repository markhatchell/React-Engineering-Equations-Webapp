import React from "react";
import './Menu.css';
import { NavLink } from 'react-router-dom'



class Menu extends React.Component {

  render() {
    return (
      <div className="mainMenu">
        <NavLink to="/ohms-law">Ohms Law</NavLink>
        <NavLink to="/radio-waves">Wavelength</NavLink>
      </div>
    );
  }
}

export default Menu;