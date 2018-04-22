import React from 'react';
import BaseEquation from '../BaseEquation';
import '../../Styles/Equations.css';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const TankCircuit = require('js-electrical-engineering-equations').TankCircuit;

class TankCircuitComponent extends BaseEquation {

  constructor(props) {
    super(props);
    if (props.hasOwnProperty('onChangeTitle')) {
      props.onChangeTitle('Tank Circuit');
    }
    this.state = {
      frequencyInHertz: '',
      inductanceInNanoHenrys: '',
      capacitanceInPicoFarads: '',
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
            <p>Supply at least two of the values to calculate the third.</p>
            <TextField
              id="full-width"
              label="&#x192; (Frequency in Hertz)"
              InputLabelProps={{
                shrink: true,
              }}
              disabled={wasLastCalculated('frequencyInHertz')}
              fullWidth
              name="frequencyInHertz"
              margin="normal"
              onChange={(e) => this.collectFloatValueFor('frequencyInHertz', e)}
              value={this.state.frequencyInHertz}
            />
            <TextField
              id="full-width"
              label="L (Inductance in nH)"
              InputLabelProps={{
                shrink: true,
              }}
              disabled={wasLastCalculated('inductanceInNanoHenrys')}
              fullWidth
              name="inductanceInNanoHenrys"
              margin="normal"
              onChange={(e) => this.collectFloatValueFor('inductanceInNanoHenrys', e)}
              value={this.state.inductanceInNanoHenrys}
            />
            <TextField
              id="full-width"
              label="C (Capacitance in pF)"
              InputLabelProps={{
                shrink: true,
              }}
              disabled={wasLastCalculated('capacitanceInPicoFarads')}
              fullWidth
              name="capacitanceInPicoFarads"
              margin="normal"
              onChange={(e) => this.collectFloatValueFor('capacitanceInPicoFarads', e)}
              value={this.state.capacitanceInPicoFarads}
            />
          </CardContent>
          <CardActions>
            <Button type="button" tabIndex="5" onClick={() => this.handleClear()}>Clear</Button>
            <Button type="submit" tabIndex="4" color="primary" variant="raised"
                    style={{marginLeft: 'auto'}}>Calculate</Button>
          </CardActions>
        </form>
      </Card>
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