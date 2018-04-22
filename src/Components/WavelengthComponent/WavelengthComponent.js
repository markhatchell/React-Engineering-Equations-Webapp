import React from 'react';
import BaseEquation from '../BaseEquation';
import '../../Styles/Equations.css';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const Wavelength = require('js-electrical-engineering-equations').Wavelength;

class WavelengthComponent extends BaseEquation {

  constructor(props) {
    super(props);
    if (props.hasOwnProperty('onChangeTitle')) {
      props.onChangeTitle('Wavelength');
    }

    this.state = {
      frequency: 146,
      wavelength: new Wavelength(146),
      threeQuartersWavelength: '',
      fiveEighthsWavelength: '',
      halfWavelength: '',
      quarterWavelength: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.calculate();
  }

  render() {
    const {
      handleSubmit,
    } = this;

    return (
      <Card className="equationBox">
        <form onSubmit={(e) => handleSubmit(e)}>
          <CardContent className="equationBoxInner">
            <p>Supply a frequency to calculate the wavelength.</p>
            <TextField
              id="full-width"
              label="Frequency in MHz"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              name="frequency"
              margin="normal"
              onChange={(e) => this.collectFloatValueFor('frequency', e)}
              value={this.state.frequency}
            />

            <Table className="table" width="100%">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Meters</TableCell>
                  <TableCell>Feet</TableCell>
                  <TableCell>Inches</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Full Wavelength</TableCell>
                  <TableCell>{this.state.wavelength.toString()}</TableCell>
                  <TableCell>{this.state.wavelength.toFeet()}</TableCell>
                  <TableCell>{this.state.wavelength.toInches()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3/4 Wavelength</TableCell>
                  <TableCell>{this.state.wavelength.toThreeQuartersWavelength('m')}</TableCell>
                  <TableCell>{this.state.wavelength.toThreeQuartersWavelength('f')}</TableCell>
                  <TableCell>{this.state.wavelength.toThreeQuartersWavelength('in')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>5/8 Wavelength</TableCell>
                  <TableCell>{this.state.wavelength.toFiveEighthsWavelength('m')}</TableCell>
                  <TableCell>{this.state.wavelength.toFiveEighthsWavelength('f')}</TableCell>
                  <TableCell>{this.state.wavelength.toFiveEighthsWavelength('in')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1/2 Wavelength</TableCell>
                  <TableCell>{this.state.wavelength.toHalfWavelength('m')}</TableCell>
                  <TableCell>{this.state.wavelength.toHalfWavelength('f')}</TableCell>
                  <TableCell>{this.state.wavelength.toHalfWavelength('in')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1/4 Wavelength</TableCell>
                  <TableCell>{this.state.wavelength.toQuarterWavelength('m')}</TableCell>
                  <TableCell>{this.state.wavelength.toQuarterWavelength('f')}</TableCell>
                  <TableCell>{this.state.wavelength.toQuarterWavelength('in')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardActions>
            <Button type="button" tabIndex="3" onClick={() => this.handleClear()}>Clear</Button>
            <Button type="submit" tabIndex="2" color="primary" variant="raised"
                    style={{marginLeft: 'auto'}}>Calculate</Button>
          </CardActions>
        </form>
      </Card>
    );
  }

  calculate() {
    this.setState(Object.assign(
      {},
      this.state,
      {
        wavelength: new Wavelength(parseFloat(this.state.frequency))
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
          frequency: 0
        }
      )
    );
  }


  handleClear() {
    this.clear();
  }

}


export default WavelengthComponent;