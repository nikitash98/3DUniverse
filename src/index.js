import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import myData from './Galaxies/data.json';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);