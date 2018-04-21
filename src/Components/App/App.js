import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import OhmsLawComponent from "../OhmsLaw/OhmsLaw";
import WavelengthComponent from "../WavelengthComponent/WavelengthComponent";
import TankCircuitComponent from "../TankCircuitComponent/TankCircuitComponent";
import BatteryRuntimeComponent from "../Battery/BatteryRuntimeComponent";
import ResistorDividerComponent from "../ResistorDividerComponent/ResistorDividerComponent";
import TopBar from "../TopBar/TopBar"
import SideMenu from "../SideMenu/SideMenu"

const Routes = [
  {
    path: '/ohms-law',
    name: 'Ohms Law',
    render: (handleChangeTitle) => (props)=><OhmsLawComponent onChangeTitle={handleChangeTitle} {...props} />,
  },
  {
    path: '/wavelength',
    name: 'Wavelength',
    render: (handleChangeTitle) => (props)=><WavelengthComponent onChangeTitle={handleChangeTitle} {...props}/>,
  },
  {
    path: '/tank-circuit',
    name: 'Tank Circuit',
    render: (handleChangeTitle) => (props)=><TankCircuitComponent onChangeTitle={handleChangeTitle} {...props} />,
  },
  {
    path: '/battery-runtime',
    name: 'Battery Runtime',
    render: (handleChangeTitle) => (props)=><BatteryRuntimeComponent onChangeTitle={handleChangeTitle} {...props} />,
  },
  {
    path: '/resistor-divider',
    name: 'Resistor Divider',
    render: (handleChangeTitle) => (props)=><ResistorDividerComponent onChangeTitle={handleChangeTitle} {...props} />,
  },
];

function MakeRoutes(props) {
  const {
    onChangeTitle,
  } = props;

  return Routes.map((route) => {
    return <Route key={route.path} path={route.path} render={route.render(onChangeTitle)} />
  });
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      title: 'Engineering Equations'
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  render() {
    const {
      toggleDrawer,
      handleChangeTitle,
    } = this;

    const {
      menuOpen,
    } = this.state;

    return (
      <div className="App">
        <TopBar title={this.state.title} onToggleDrawer={toggleDrawer} />
        <SideMenu onToggleDrawer={toggleDrawer} isOpen={menuOpen} routes={Routes} />
        <Switch>
          <MakeRoutes onChangeTitle={handleChangeTitle} />
        </Switch>
      </div>
    );
  }

  toggleDrawer() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  };

  handleChangeTitle(newTitle) {
    document.title = newTitle;
    this.setState(Object.assign(
      this.state,
      {
        title: newTitle
      }
    ));
  }

}


export default App;
