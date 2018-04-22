import React from 'react';
import BaseEquation from '../BaseEquation';
import '../../Styles/Equations.css';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';

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
      <Card className="equationBox">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <CardContent className="equationBoxInner">
            <p>Calculate the runtime on a battery. This equation does not take into account the diminished runtime
              effect of
              high current applications.</p>
            <p>The efficiency of the system is set to 80% by default.</p>
            <TextField
              id="full-width"
              label="Battery capacity in amp hours"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              name="batteryCapacityInAmpHours"
              margin="normal"
              onChange={(e) => this.collectFloatValueFor('batteryCapacityInAmpHours', e)}
              value={this.state.batteryCapacityInAmpHours}
            />
            <TextField
              id="full-width"
              label="Current draw in amps"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              name="currentDrawInAmps"
              margin="normal"
              onChange={(e) => this.collectFloatValueFor('currentDrawInAmps', e)}
              value={this.state.currentDrawInAmps}
            />
            <TextField
              id="full-width"
              label="Efficiency of system"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              name="efficiency"
              margin="normal"
              onChange={(e) => this.collectFloatValueFor('efficiency', e)}
              value={this.state.efficiency}
            />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="left">
                    Battery capacity in amp hours
                  </TableCell>
                  <TableCell align="left">
                    {this.state.battery.getBatteryCapacityInAmpHours()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    Battery capacity in coulombs
                  </TableCell>
                  <TableCell align="left">
                    {this.state.battery.getBatteryCapacityInCoulombs()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    Battery run time in min
                  </TableCell>
                  <TableCell align="left">
                    {this.state.battery.getRunTimeInMin()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    Battery run time in hours
                  </TableCell>
                  <TableCell align="left">
                    {this.state.battery.getRunTimeInHours()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    Battery run time in days
                  </TableCell>
                  <TableCell align="left">
                    {getFloat(this.state.battery.getRunTimeInHours() / 24, 4)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardActions>
            <Button type="submit" tabIndex="4" color="primary" variant="raised"
                    style={{marginLeft: 'auto'}}>Calculate</Button>
          </CardActions>
        </form>
      </Card>
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