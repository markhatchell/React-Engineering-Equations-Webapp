import React from 'react';
import BaseEquation from '../BaseEquation';
import '../../Styles/Equations.css';
const { ResistorDivider } = require('js-electrical-engineering-equations');

class ResistorDividerComponent extends BaseEquation {

  constructor(props) {
    super(props);
    if (props.hasOwnProperty('onChangeTitle')) {
      props.onChangeTitle('Resistor Divider');
    }
    this.state = {
      inputVoltage: '',
      resistor1: '',
      resistor2: '',
      outputVoltage: '',
      lastCalculated: []
    }
  }

  render() {

    return (
      <div className="equationBox">
        <h3>Resistor Divider</h3>
        <div className="equationBoxInner">
          <p>Supply at least three of the values to calculate the fourth.</p>
          <p>The base equation for a resistor divider network is <br /> Vo = (Vs * R2) / (R1 + R2)</p>
          <div className="tableContainer">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <table className="table">
                <tbody>
                <tr>
                  <td align="left">
                    <label htmlFor="omhslaw-I">Input Voltage</label>
                  </td>
                  <td>
                    <input id="inputVoltage" value={this.state.inputVoltage} disabled={this.wasLastCalculated('inputVoltage')}
                           autoComplete="off"
                           tabIndex="1"
                           onChange={(e) => this.collectFloatValueFor('inputVoltage', e)}/>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <label htmlFor="omhslaw-V">Resistor 1 (Ohms)</label>
                  </td>
                  <td>
                    <input id="resistor1" value={this.state.resistor1} disabled={this.wasLastCalculated('resistor1')}
                           autoComplete="off"
                           tabIndex="2"
                           onChange={(e) => this.collectFloatValueFor('resistor1', e)}/>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <label htmlFor="omhslaw-R">Resistor 2 (Ohms)</label>
                  </td>
                  <td>
                    <input id="resistor2" value={this.state.resistor2} disabled={this.wasLastCalculated('resistor2')}
                           autoComplete="off"
                           tabIndex="3"
                           onChange={(e) => this.collectFloatValueFor('resistor2', e)}/>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <label htmlFor="omhslaw-W">Output Voltage</label>
                  </td>
                  <td>
                    <input id="outputVoltage" value={this.state.outputVoltage} disabled={this.wasLastCalculated('outputVoltage')}
                           autoComplete="off"
                           tabIndex="4"
                           onChange={(e) => this.collectFloatValueFor('outputVoltage', e)}/>
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
      </div>
    );
  }

  calculateOtherValues() {
    const {inputVoltage, resistor1, resistor2, outputVoltage} = this.state;

    if ((this.wasLastCalculated('outputVoltage')) || (inputVoltage && resistor1 && resistor2 && outputVoltage === '')) {
      this.setState(
        Object.assign(
          {},
          this.state,
          ResistorDivider.calcOutputVoltage(parseFloat(inputVoltage), parseFloat(resistor1), parseFloat(resistor2)),
          {
            lastCalculated: ['outputVoltage']
          }
        )
      );
    } else if ((this.wasLastCalculated('resistor1')) || (inputVoltage && resistor2 && outputVoltage && resistor1 === '')) {
      this.setState(
        Object.assign(
          {},
          this.state,
          ResistorDivider.calcResistor1(parseFloat(inputVoltage), parseFloat(outputVoltage), parseFloat(resistor2)),
          {
            lastCalculated: ['resistor1']
          }
        )
      );
    } else if ((this.wasLastCalculated('resistor2')) || (inputVoltage && resistor1 && outputVoltage && resistor2 === '')) {
      this.setState(
        Object.assign(
          {},
          this.state,
          ResistorDivider.calcResistor2(parseFloat(inputVoltage), parseFloat(outputVoltage), parseFloat(resistor1)),
          {
            lastCalculated: ['resistor2']
          }
        )
      );
    } else if ((this.wasLastCalculated('inputVoltage')) || (outputVoltage && resistor1 && resistor2 && inputVoltage === '')) {
      this.setState(
        Object.assign(
          {},
          this.state,
          ResistorDivider.calcInputVoltage(parseFloat(outputVoltage), parseFloat(resistor1), parseFloat(resistor2)),
          {
            lastCalculated: ['inputVoltage']
          }
        )
      );
    }

  }

  countValues() {
    const values = [this.state.inputVoltage, this.state.resistor1, this.state.resistor2, this.state.outputVoltage];
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
    if (this.countValues() === 3 || lastCalculated !== []) {
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
          inputVoltage: '',
          resistor1: '',
          resistor2: '',
          outputVoltage: '',
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


export default ResistorDividerComponent;