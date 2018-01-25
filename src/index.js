import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
import { BrowserRouter } from 'react-router-dom'
import './Styles/index.css';


ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
