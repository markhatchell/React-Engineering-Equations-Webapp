import React from 'react';
import BaseEquation from '../BaseEquation';
import '../../Styles/Equations.css';
const Battery = require('js-electrical-engineering-equations').Battery;
const getFloat = require('js-electrical-engineering-equations').getFloat;

class BatteryRuntimeComponent extends BaseEquation {

  constructor(props) {
    if (props.hasOwnProperty('onChangeTitle')) {
      props.onChangeTitle('Battery Runtime');
    }
    super(props);
    this.state = {
      batteryCapacityInAmpHours: 1,
      currentDrawInAmps: 1,
      efficiency: .8,
      battery: new Battery()
    }
  }

  componentDidMount() {
    this.calculate();
  }

  render() {
    return (
      <div className="equationBox">
        <h3>Battery Runtime</h3>
        <div className="equationBoxInner">
          <p>Calculate the runtime on a battery. This equation does not take into account the diminished runtime effect of
            high current applications.</p>
          <p>The efficiency of the system is set to 80% by default.</p>
          <div className="tableContainer">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <table className="table" width="100%">
                <tbody>
                <tr>
                  <td align="left">
                    <label htmlFor="batteryCapacityInAmpHours">Battery capacity in amp hours</label>
                  </td>
                  <td>
                    <input id="batteryCapacityInAmpHours" value={this.state.batteryCapacityInAmpHours}
                           autoComplete="off"
                           onChange={(e) => this.collectFloatValueFor('batteryCapacityInAmpHours', e)}/>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <label htmlFor="currentDrawInAmps">Current draw in amps</label>
                  </td>
                  <td>
                    <input id="currentDrawInAmps" value={this.state.currentDrawInAmps}
                           autoComplete="off"
                           onChange={(e) => this.collectFloatValueFor('currentDrawInAmps', e)}/>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <label htmlFor="efficiency">Efficiency of system</label>
                  </td>
                  <td>
                    <input id="efficiency" value={this.state.efficiency}
                           autoComplete="off"
                           onChange={(e) => this.collectFloatValueFor('efficiency', e)}/>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    Battery capacity in amp hours
                  </td>
                  <td align="left">
                    {this.state.battery.getBatteryCapacityInAmpHours()}
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    Battery capacity in coulombs
                  </td>
                  <td align="left">
                    {this.state.battery.getBatteryCapacityInCoulombs()}
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    Battery run time in min
                  </td>
                  <td align="left">
                    {this.state.battery.getRunTimeInMin()}
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    Battery run time in hours
                  </td>
                  <td align="left">
                    {this.state.battery.getRunTimeInHours()}
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    Battery run time in days
                  </td>
                  <td align="left">
                    {getFloat(this.state.battery.getRunTimeInHours() / 24, 4)}
                  </td>
                </tr>
                <tr>
                  <td align="left">
                  </td>
                  <td align="right">
                    <button type="submit">Calculate</button>
                  </td>
                </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    );
  }

  updateBattery() {
    let battery = this.state.battery;
    battery.setBatteryCapacityInAmpHours(parseFloat(this.state.batteryCapacityInAmpHours));
    battery.setCurrentDraw(parseFloat(this.state.currentDrawInAmps));
    battery.efficiency = this.state.efficiency;
    battery.calculateRuntime();
    return battery;
  }

  calculate() {
    this.setState(Object.assign(
      this.state,
      {
        battery: this.updateBattery()
      }
    ));

  }

  handleSubmit(e) {
    this.calculate();
    e.preventDefault();
    return false;
  }

}


export default BatteryRuntimeComponent;