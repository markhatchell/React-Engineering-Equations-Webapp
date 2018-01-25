import React from 'react';


class BaseEquation extends React.Component {

  constructor(props) {
    super(props);
  }

  collectFloatValueFor(field, e) {
    let state = {};
    state[field] = e.target.value || '';
    this.setState(
      Object.assign(
        {},
        this.state,
        state
      )
    );
  }

}

export default BaseEquation;