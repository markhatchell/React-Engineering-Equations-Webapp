import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OhmsLawComponent from "./OhmsLaw";

configure({ adapter: new Adapter() });

const dom = renderer.create(
  <OhmsLawComponent />,
);

describe('OhmsLawComponent', () => {

  test('snapshot matches', () => {
    let tree = dom.toJSON();
    expect(tree).toMatchSnapshot();
  });

  const component = shallow(<OhmsLawComponent />);
  const instance = component.instance();


  test('voltage should be 10', () => {
    component.setState(Object.assign(
      {},
      component.state(),
      {
        voltage: "10"
      }
    ));
    expect(component.state("voltage")).toBe("10");
  });

  test('current should be .5', () => {
    component.setState(Object.assign(
      {},
      component.state(),
      {
        voltage: "10",
        current: ".5"
      }
    ));
    expect(component.state("current").toString()).toBe(".5");
  });

  test('calculated resistance should be 20', () => {
    component.setState(Object.assign(
      {},
      component.state(),
      {
        voltage: "10",
        current: ".5"
      }
    ));
    instance.calculateOtherValues();
    expect(component.state("resistance").toString()).toBe("20");
  });

  test('calculated watts should be 5', () => {
    component.setState(Object.assign(
      {},
      component.state(),
      {
        voltage: "10",
        current: ".5"
      }
    ));
    instance.calculateOtherValues();
    expect(component.state("watts").toString()).toBe("5");
  });

});
