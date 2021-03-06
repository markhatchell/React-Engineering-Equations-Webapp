import React from 'react';
import renderer from 'react-test-renderer';
import WavelengthComponent from "./WavelengthComponent";
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const dom = renderer.create(
  <WavelengthComponent />,
);

describe('WavelengthComponent', () => {

  test('snapshot matches', () => {
    let tree = dom.toJSON();
    expect(tree).toMatchSnapshot();
  });

  let component = shallow(<WavelengthComponent />);
  let instance = component.instance();


  test('frequency should be 300', () => {
    component.setState(Object.assign(
      {},
      component.state(),
      {
        frequency: 300
      }
    ));
    expect(component.state("frequency")).toBe(300);
  });

  test('wavelength should be 1', () => {
    component.setState(Object.assign(
      {},
      component.state(),
      {
        frequency: 300
      }
    ));
    instance.calculate();
    expect(component.state("wavelength").toFloat()).toEqual(1);
  });

});
