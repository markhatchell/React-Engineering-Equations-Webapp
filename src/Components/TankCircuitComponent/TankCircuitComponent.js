import React from 'react';
import BaseEquation from '../BaseEquation';
import '../../Styles/Equations.css';
const TankCircuit = require('js-electrical-engineering-equations').TankCircuit;

class TankCircuitComponent extends BaseEquation {

  constructor(props) {
    super(props);
    this.state = {
      frequencyInHertz: '',
      inductanceInNanoHenrys: '',
      capacitanceInPicoFarads: '',
      lastCalculated: []
    }
  }

  render() {
    return (
      <div className="equationBox">
        <h3>Tank Circuit</h3>
        <div className="equationBoxInner">
          <p>Supply at least two of the values to calculate the third.</p>
          <div className="tableContainer">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <table className="table">
                <tbody>
                <tr>
                  <td align="left">
                    <label htmlFor="tankcircuit-F"> &#x192; (Frequency in Hertz)</label>
                  </td>
                  <td>
                    <input id="tankcircuit-F" value={this.state.frequencyInHertz} disabled={this.wasLastCalculated('frequencyInHertz')}
                           autoComplete="off"
                           tabIndex="1"
                           onChange={(e) => this.collectFloatValueFor('frequencyInHertz', e)}/>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <label htmlFor="tankcircuit-L">L (Inductance in nH)</label>
                  </td>
                  <td>
                    <input id="tankcircuit-L" value={this.state.inductanceInNanoHenrys} disabled={this.wasLastCalculated('inductanceInNanoHenrys')}
                           autoComplete="off"
                           tabIndex="2"
                           onChange={(e) => this.collectFloatValueFor('inductanceInNanoHenrys', e)}/>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <label htmlFor="tankcircuit-C">C (Capacitance in pF)</label>
                  </td>
                  <td>
                    <input id="tankcircuit-C" value={this.state.capacitanceInPicoFarads} disabled={this.wasLastCalculated('capacitanceInPicoFarads')}
                           autoComplete="off"
                           tabIndex="3"
                           onChange={(e) => this.collectFloatValueFor('capacitanceInPicoFarads', e)}/>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <button type="button" tabIndex="5" onClick={() => this.handleClear()}>Clear</button>
                  </td>
                  <td align="right">
                    <button type="submit" tabIndex="4">Calculate</button>
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
    const { frequencyInHertz, inductanceInNanoHenrys ,capacitanceInPicoFarads } = this.state;
    const inductance  = parseFloat(this.state.inductanceInNanoHenrys) / 1000000000;
    const capacitance = parseFloat(this.state.capacitanceInPicoFarads) / 1000000000000;


    if (this.wasLastCalculated('frequencyInHertz') || (inductanceInNanoHenrys && capacitanceInPicoFarads && frequencyInHertz === '')) {
      const calculatedFrequencyInHertz = TankCircuit.calcFrequency(inductance, capacitance);
      this.setState(
        Object.assign(
          {},
          this.state,
          {
            frequencyInHertz: numberWithCommas(calculatedFrequencyInHertz),
            lastCalculated: ['frequencyInHertz']
          }
        )
      );
    } else if (this.wasLastCalculated('capacitanceInPicoFarads') || (frequencyInHertz && inductanceInNanoHenrys && capacitanceInPicoFarads === '')) {
      const frequencyAsFloat = parseFloat(frequencyInHertz.replace(/,/g,''));
      const calculatedCapacitanceInFarads = TankCircuit.calcCapacitance(frequencyAsFloat, inductance);

      this.setState(
        Object.assign(
          {},
          this.state,
          {
            capacitanceInPicoFarads: calculatedCapacitanceInFarads * 1000000000000,
            lastCalculated: ['capacitanceInPicoFarads']
          }
        )
      );
    } else if (this.wasLastCalculated('inductanceInNanoHenrys') || (frequencyInHertz && capacitanceInPicoFarads && inductanceInNanoHenrys === '')) {
      const frequencyAsFloat = parseFloat(frequencyInHertz.replace(/,/g,''));
      const calculatedInductanceInHenrys = TankCircuit.calcInductance(frequencyAsFloat, capacitance);

      this.setState(
        Object.assign(
          {},
          this.state,
          {
            inductanceInNanoHenrys: calculatedInductanceInHenrys * 1000000000,
            lastCalculated: ['inductanceInNanoHenrys']
          }
        )
      );
    }

  }

  countValues() {
    const values = [this.state.frequencyInHertz, this.state.inductanceInNanoHenrys, this.state.capacitanceInPicoFarads];
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
          frequencyInHertz: '',
          inductanceInNanoHenrys: '',
          capacitanceInPicoFarads: '',
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

const numberWithCommas = (x) => {
  let sides = x.toString().split('.');
  if (!sides.hasOwnProperty(1)) {
    sides[1] = 0;
  }
  return sides[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' +  sides[1];
};


export default TankCircuitComponent;