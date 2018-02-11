import React, { Component } from 'react';
import './App.css';
import Menu from "../Menu/Menu";
import { Route, Switch } from 'react-router-dom'
import OhmsLawComponent from "../OhmsLaw/OhmsLaw";
import WavelengthComponent from "../WavelengthComponent/WavelengthComponent";
import TankCircuitComponent from "../TankCircuitComponent/TankCircuitComponent";
import BatteryRuntimeComponent from "../Battery/BatteryRuntimeComponent";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      title: 'Engineering Equations'
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" onClick={this.handleMenuOpenClick.bind(this)}>
          <h1 className="App-title">{this.state.title}</h1>
        </header>
        <Menu menuOpen={this.state.menuOpen} onMenuItemClick={this.handleMenuItemClick.bind(this)}/>
        <Switch>
          <Route path="/ohms-law" render={(props)=><OhmsLawComponent onChangeTitle={(title) => {this.handleChangeTitle(title)}} {...props} /> } />
          <Route path="/wavelength" render={(props)=><WavelengthComponent onChangeTitle={(title) => {this.handleChangeTitle(title)}} {...props}/> } />
          <Route path="/tank-circuit" render={(props)=><TankCircuitComponent onChangeTitle={(title) => {this.handleChangeTitle(title)}} {...props} /> } />
          <Route path="/battery-runtime" render={(props)=><BatteryRuntimeComponent onChangeTitle={(title) => {this.handleChangeTitle(title)}} {...props} />} />
        </Switch>
      </div>
    );
  }

  handleChangeTitle(newTitle) {
    this.setState(Object.assign(
      this.state,
      {
        title: newTitle
      }
    ));
  }

  handleMenuOpenClick() {
    this.setState(Object.assign(
      this.state,
      {menuOpen: !this.state.menuOpen}
    ));
  }

  handleMenuItemClick() {
    this.setState(Object.assign(
      this.state,
      {menuOpen: false}
    ));
  }

}


export default App;
