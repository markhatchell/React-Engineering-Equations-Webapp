import React, { Component } from 'react';
import './App.css';
import Menu from "../Menu/Menu";
import { Route, Switch } from 'react-router-dom'
import OhmsLawComponent from "../OhmsLaw/OhmsLaw";
import RadioEquationsComponent from "../RadioEquations/RadioEquations";





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
          <Route path="/radio-waves" component={RadioEquationsComponent}/>
        </Switch>
      </div>
    );
  }
}


export default App;
