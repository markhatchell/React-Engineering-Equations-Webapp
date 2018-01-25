import React from 'react';
import BaseEquation from "../BaseEquation";
import { Wavelength } from 'js-electrical-engineering-equations';
import '../../Styles/Equations.css';

class RadioEquationsComponent extends BaseEquation {

  constructor(props) {
    super(props);
    this.state = {
      frequency: '146',
      wavelength: new Wavelength(146),
      threeQuartersWavelength: '',
      fiveEighthsWavelength: '',
      halfWavelength: '',
      quarterWavelength: '',
    }
  }

  componentDidMount() {
    this.calculate();
  }

  render() {
    return (
      <div className="equationBox">
        <h3>Wavelength</h3>
        <div className="equationBoxInner">
          <p>Supply a frequency to calculate the wavelength.</p>
          <div className="tableContainer">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <table className="table" width="100%">
                <tbody>
                <tr>
                  <td align="left">
                    <label htmlFor="frequency">Frequency in MHz</label>
                  </td>
                  <td>
                    <input id="frequency" value={this.state.frequency}
                           autoComplete="off"
                           onChange={(e) => this.collectFloatValueFor('frequency', e)}/>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <table width="100%">
                      <tbody>
                      <tr>
                        <td></td>
                        <td>Meters</td>
                        <td>Feet</td>
                        <td>Inches</td>
                      </tr>
                      <tr>
                        <td>Full Wavelength</td>
                        <td>{this.state.wavelength.toString()}</td>
                        <td>{this.state.wavelength.toFeet()}</td>
                        <td>{this.state.wavelength.toInches()}</td>
                      </tr>
                      <tr>
                        <td>3/4 Wavelength</td>
                        <td>{this.state.wavelength.toThreeQuartersWavelength('m')}</td>
                        <td>{this.state.wavelength.toThreeQuartersWavelength('f')}</td>
                        <td>{this.state.wavelength.toThreeQuartersWavelength('in')}</td>
                      </tr>
                      <tr>
                        <td>5/8 Wavelength</td>
                        <td>{this.state.wavelength.toFiveEighthsWavelength('m')}</td>
                        <td>{this.state.wavelength.toFiveEighthsWavelength('f')}</td>
                        <td>{this.state.wavelength.toFiveEighthsWavelength('in')}</td>
                      </tr>
                      <tr>
                        <td>1/2 Wavelength</td>
                        <td>{this.state.wavelength.toHalfWavelength('m')}</td>
                        <td>{this.state.wavelength.toHalfWavelength('f')}</td>
                        <td>{this.state.wavelength.toHalfWavelength('in')}</td>
                      </tr>
                      <tr>
                        <td>1/4 Wavelength</td>
                        <td>{this.state.wavelength.toQuarterWavelength('m')}</td>
                        <td>{this.state.wavelength.toQuarterWavelength('f')}</td>
                        <td>{this.state.wavelength.toQuarterWavelength('in')}</td>
                      </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <button type="button" onClick={() => this.handleClear()}>Clear</button>
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

  calculate() {
    this.setState(Object.assign(
      {},
      this.state,
      {
        wavelength: new Wavelength(this.state.frequency)
      }
    ));

  }


  handleSubmit(e) {
    this.calculate();
    e.preventDefault();
    return false;
  }

  clear() {
    this.setState(
      Object.assign(
        {},
        this.state,
        {
          frequency: ''
        }
      )
    );
  }


  handleClear() {
    this.clear();
  }

}


export default RadioEquationsComponent;