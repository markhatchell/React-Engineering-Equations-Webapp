import React from 'react';
import BaseEquation from '../BaseEquation';
import '../../Styles/Equations.css';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

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
    };
    this.wasLastCalculated = this.wasLastCalculated.bind(this);
  }

  render() {
    const { wasLastCalculated } = this;

    return (
      <Card className="equationBox">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <CardContent className="equationBoxInner">
            <p>Supply at least three of the values to calculate the fourth.</p>
            <p>The base equation for a resistor divider network is <br /> Vo = (Vs * R2) / (R1 + R2)</p>
            <TextField
              id="full-width"
              label="Input Voltage"
              InputLabelProps={{
                shrink: true,
              }}
              disabled={wasLastCalculated('inputVoltage')}
              fullWidth
              name="inputVoltage"
              margin="normal"
              onChange={(e) => this.collectFloatValueFor('inputVoltage', e)}
              value={this.state.inputVoltage}
            />
            <TextField
              id="full-width"
              label="Resistor 1 (Ohms)"
              InputLabelProps={{
                shrink: true,
              }}
              disabled={wasLastCalculated('resistor1')}
              fullWidth
              name="resistor1"
              margin="normal"
              onChange={(e) => this.collectFloatValueFor('resistor1', e)}
              value={this.state.resistor1}
            />
            <TextField
              id="full-width"
              label="Resistor 2 (Ohms)"
              InputLabelProps={{
                shrink: true,
              }}
              disabled={wasLastCalculated('resistor2')}
              fullWidth
              name="resistor2"
              margin="normal"
              onChange={(e) => this.collectFloatValueFor('resistor2', e)}
              value={this.state.resistor2}
            />
            <TextField
              id="full-width"
              label="Output Voltage"
              InputLabelProps={{
                shrink: true,
              }}
              disabled={wasLastCalculated('outputVoltage')}
              fullWidth
              name="outputVoltage"
              margin="normal"
              onChange={(e) => this.collectFloatValueFor('outputVoltage', e)}
              value={this.state.outputVoltage}
            />
          </CardContent>
          <CardActions>
            <Button type="button" tabIndex="6" onClick={() => this.handleClear()}>Clear</Button>
            <Button type="submit" tabIndex="5" color="primary" variant="raised" style={{marginLeft: 'auto'}}>Calculate</Button>
          </CardActions>
        </form>
      </Card>
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