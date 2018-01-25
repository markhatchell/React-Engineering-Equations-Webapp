import React from 'react';
import renderer from 'react-test-renderer';
import TankCircuitComponent from "./TankCircuitComponent";
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const dom = renderer.create(
  <TankCircuitComponent />,
);

describe('TankCircuitComponent', () => {

  test('snapshot matches', () => {
    let tree = dom.toJSON();
    expect(tree).toMatchSnapshot();
  });

  const component = shallow(<TankCircuitComponent />);
  const instance = component.instance();


});
