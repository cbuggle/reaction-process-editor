import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronCircleDown, faChevronCircleRight, faDownload, faEdit, faPen, faSearch, faSpinner, faUserCircle, faPlus} from '@fortawesome/free-solid-svg-icons'

library.add(faChevronCircleDown, faChevronCircleRight, faDownload, faEdit, faPen, faSearch, faSpinner, faUserCircle, faPlus)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
