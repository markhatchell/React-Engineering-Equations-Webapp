import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

