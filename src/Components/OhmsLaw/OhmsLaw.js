import React from 'react';
import BaseEquation from '../BaseEquation';
import '../../Styles/Equations.css';
const OhmsLaw = require('js-electrical-engineering-equations').OhmsLaw;

class OhmsLawComponent extends BaseEquation {

  constructor(props) {
    super(props);
    this.state = {
      current: '',
      voltage: '',
      resistance: '',
      watts: '',
      lastCalculated: []
    }
  }

  render() {
    return (
      <div className="equationBox">
        <h3>Ohms Law</h3>
        <div className="equationBoxInner">
          <p>Supply at least two of the values to calculate the others.</p>
          <div className="tableContainer">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <table className="table">
                <tbody>
                <tr>
                  <td align="left">
                    <label htmlFor="omhslaw-I">I (Current)</label>
                  </td>
                  <td>
                    <input id="omhslaw-I" value={this.state.current} disabled={this.wasLastCalculated('current')}
                           autoComplete="off"
                           tabIndex="1"
                           onChange={(e) => this.collectFloatValueFor('current', e)}/>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <label htmlFor="omhslaw-V">V (Volts)</label>
                  </td>
                  <td>
                    <input id="omhslaw-V" value={this.state.voltage} disabled={this.wasLastCalculated('voltage')}
                           autoComplete="off"
                           tabIndex="2"
                           onChange={(e) => this.collectFloatValueFor('voltage', e)}/>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <label htmlFor="omhslaw-R">R (Resistance)</label>
                  </td>
                  <td>
                    <input id="omhslaw-R" value={this.state.resistance} disabled={this.wasLastCalculated('resistance')}
                           autoComplete="off"
                           tabIndex="3"
                           onChange={(e) => this.collectFloatValueFor('resistance', e)}/>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <label htmlFor="omhslaw-W">P (Watts)</label>
                  </td>
                  <td>
                    <input id="omhslaw-W" value={this.state.watts} disabled={this.wasLastCalculated('watts')}
                           autoComplete="off"
                           tabIndex="4"
                           onChange={(e) => this.collectFloatValueFor('watts', e)}/>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <button type="button" tabIndex="6" onClick={() => this.handleClear()}>Clear</button>
                  </td>
                  <td align="right">
                    <button type="submit" tabIndex="5">Calculate</button>
                  </td>
                </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
        <img src="/FormulaWheelElectronics.gif" className="Omh's Law Formula Wheel" alt="Omh's Law formula Wheel"/>
      </div>
    );
  }

  calculateOtherValues() {
    const {current, voltage, resistance, watts} = this.state;

    if ((this.wasLastCalculated('watts') && this.wasLastCalculated('resistance')) || (current && voltage && resistance === '' && watts === '')) {
      this.setState(
        Object.assign(
          {},
          this.state,
          OhmsLaw.calcWattsResistance(parseFloat(current), parseFloat(voltage)),
          {
            lastCalculated: ['watts', 'resistance']
          }
        )
      );
    } else if ((this.wasLastCalculated('watts') && this.wasLastCalculated('current')) || (resistance && voltage && current === '' && watts === '')) {
      this.setState(
        Object.assign(
          {},
          this.state,
          OhmsLaw.calcWattsCurrent(parseFloat(resistance), parseFloat(voltage)),
          {
            lastCalculated: ['watts', 'current']
          }
        )
      );
    } else if ((this.wasLastCalculated('watts') && this.wasLastCalculated('voltage')) || (resistance && current && voltage === '' && watts === '')) {
      this.setState(
        Object.assign(
          {},
          this.state,
          OhmsLaw.calcWattsVoltage(parseFloat(resistance), parseFloat(current)),
          {
            lastCalculated: ['watts', 'voltage']
          }
        )
      );
    } else if ((this.wasLastCalculated('voltage') && this.wasLastCalculated('current')) || (resistance && watts && voltage === '' && current === '')) {
      this.setState(
        Object.assign(
          {},
          this.state,
          OhmsLaw.calcVoltageCurrent(parseFloat(resistance), parseFloat(watts)),
          {
            lastCalculated: ['voltage', 'current']
          }
        )
      );
    } else if ((this.wasLastCalculated('voltage') && this.wasLastCalculated('resistance')) || (current && watts && voltage === '' && resistance === '')) {
      this.setState(
        Object.assign(
          {},
          this.state,
          OhmsLaw.calcVoltageResistance(parseFloat(current), parseFloat(watts)),
          {
            lastCalculated: ['voltage', 'resistance']
          }
        )
      );
    } else if ((this.wasLastCalculated('current') && this.wasLastCalculated('resistance')) || (voltage && watts && current === '' && resistance === '')) {
      this.setState(
        Object.assign(
          {},
          this.state,
          OhmsLaw.calcCurrentResistance(parseFloat(watts), parseFloat(voltage)),
          {
            lastCalculated: ['current', 'resistance']
          }
        )
      );
    }

  }

  countValues() {
    const values = [this.state.current, this.state.voltage, this.state.resistance, this.state.watts];
    let valuesCount = 0;
    for (let i = 0; i < values.length; i++) {
      if (values[i] !== '') {
        valuesCount++;
      }
    }
    return valuesCount;
  }

  handleSubmit(e) {
    const {lastCalculated} = this.state;
    if (this.countValues() === 2 || lastCalculated !== []) {
      this.calculateOtherValues();
    } else {
      this.clear();
    }
    e.preventDefault();
    return false;
  }

  clear() {
    this.setState(
      Object.assign(
        {},
        this.state,
        {
          current: '',
          voltage: '',
          resistance: '',
          watts: '',
          lastCalculated: ''
        }
      )
    );
  }


  handleClear() {
    this.clear();
  }

  wasLastCalculated(field) {
    const lastCalculated = this.state.lastCalculated;
    return lastCalculated.indexOf(field) >= 0;

  }

}


export default OhmsLawComponent;