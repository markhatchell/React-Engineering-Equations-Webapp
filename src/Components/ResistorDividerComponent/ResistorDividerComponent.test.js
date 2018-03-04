import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResistorDividerComponent from "./ResistorDividerComponent";

configure({ adapter: new Adapter() });

const dom = renderer.create(
  <ResistorDividerComponent />,
);

describe('ResistorDividerComponent', () => {

  test('snapshot matches', () => {
    let tree = dom.toJSON();
    expect(tree).toMatchSnapshot();
  });

  const component = shallow(<ResistorDividerComponent />);
  const instance = component.instance();



});
