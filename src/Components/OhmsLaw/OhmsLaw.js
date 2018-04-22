import React from 'react';
import BaseEquation from '../BaseEquation';
import '../../Styles/Equations.css';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const OhmsLaw = require('js-electrical-engineering-equations').OhmsLaw;

class OhmsLawComponent extends BaseEquation {

  constructor(props) {
    super(props);
    if (props.hasOwnProperty('onChangeTitle')) {
      props.onChangeTitle('Ohms Law');
    }
    this.state = {
      current: '',
      voltage: '',
      resistance: '',
      watts: '',
      lastCalculated: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.wasLastCalculated = this.wasLastCalculated.bind(this);
  }

  render() {
    const { wasLastCalculated, handleSubmit } = this;
    return (
      <Card className="equationBox">
        <form onSubmit={handleSubmit}>
          <CardContent className="equationBoxInner">
            <p>Supply at least two of the values to calculate the others.</p>
              <TextField
                id="full-width"
                label="I (Current)"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={wasLastCalculated('current')}
                fullWidth
                name="current"
                margin="normal"
                onChange={(e) => this.collectFloatValueFor('current', e)}
                value={this.state.current}
              />
              <TextField
                id="full-width"
                label="V (Volts)"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={wasLastCalculated('voltage')}
                fullWidth
                name="voltage"
                margin="normal"
                onChange={(e) => this.collectFloatValueFor('voltage', e)}
                value={this.state.voltage}
              />
              <TextField
                id="full-width"
                label="R (Resistance)"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={wasLastCalculated('resistance')}
                fullWidth
                name="resistance"
                margin="normal"
                onChange={(e) => this.collectFloatValueFor('resistance', e)}
                value={this.state.resistance}
              />
              <TextField
                id="full-width"
                label="P (Watts)"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={wasLastCalculated('watts')}
                fullWidth
                name="watts"
                margin="normal"
                onChange={(e) => this.collectFloatValueFor('watts', e)}
                value={this.state.watts}
              />
          </CardContent>
          <CardActions>
            <Button type="button" tabIndex="6" onClick={() => this.handleClear()}>Clear</Button>
            <Button type="submit" tabIndex="5" color="primary" variant="raised" style={{marginLeft: 'auto'}}>Calculate</Button>
          </CardActions>
          <p>
            <img src="/FormulaWheelElectronics.gif" className="Omh's Law Formula Wheel" alt="Omh's Law formula Wheel"/>
          </p>
        </form>
      </Card>
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