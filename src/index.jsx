import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faUserCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner, faUserCircle)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
