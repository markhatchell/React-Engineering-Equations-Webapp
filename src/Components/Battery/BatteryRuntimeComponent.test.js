import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BatteryRuntimeComponent from "./BatteryRuntimeComponent";

configure({ adapter: new Adapter() });

const dom = renderer.create(
  <BatteryRuntimeComponent />,
);

describe('BatteryRuntimeComponent', () => {

  test('snapshot matches', () => {
    let tree = dom.toJSON();
    expect(tree).toMatchSnapshot();
  });

  let component = shallow(<BatteryRuntimeComponent />);
  let instance = component.instance();


  test('wavelength should be 1', () => {
    component.setState(Object.assign(
      {},
      component.state(),
      {
        batteryCapacityInAmpHours: 1,
        currentDrawInAmps: 1,
        efficiency: .8
      }
    ));
    instance.calculate();
    expect(component.state("battery").getRunTimeInMin()).toEqual(48);
  });

});
