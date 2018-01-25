import React, { Component } from 'react';
import './App.css';
import Menu from "../Menu/Menu";
import { Route, Switch } from 'react-router-dom'
import OhmsLawComponent from "../OhmsLaw/OhmsLaw";
import WavelengthComponent from "../WavelengthComponent/WavelengthComponent";
import TankCircuitComponent from "../TankCircuitComponent/TankCircuitComponent";





class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Engineering Equations</h1>
        </header>
        <Menu/>
        <Switch>
          <Route path="/ohms-law" component={OhmsLawComponent}/>
          <Route path="/wavelength" component={WavelengthComponent}/>
          <Route path="/tank-circuit" component={TankCircuitComponent}/>
        </Switch>
      </div>
    );
  }
}


export default App;
