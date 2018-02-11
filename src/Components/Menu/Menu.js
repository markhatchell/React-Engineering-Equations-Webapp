import React from "react";
import './Menu.css';
import { NavLink } from 'react-router-dom'



class Menu extends React.Component {

  constructor(props) {
    super(props);
    if (props.hasOwnProperty('onMenuItemClick')) {
      this.handleMenuItemClick = props.onMenuItemClick;
    } else {
      this.handleMenuItemClick = () => {};
    }
  }

  render() {
    return (
      <div className="mainMenu" data-open={this.props.menuOpen} onClick={this.handleMenuItemClick}>
        <NavLink to="/ohms-law">Ohms Law</NavLink>
        <NavLink to="/wavelength">Wavelength</NavLink>
        <NavLink to="/tank-circuit">Tank Circuit</NavLink>
        <NavLink to="/battery-runtime">Battery Runtime</NavLink>
      </div>
    );
  }
}

export default Menu;