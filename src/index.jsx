import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronCircleDown,
  faChevronCircleRight,
  faDownload,
  faEdit,
  faPen,
  faSearch,
  faUserCircle,
  faPlus,
  faTrash,
  faTimes,
  faArrowsAltV,
  faArrowsAltH,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faSearchPlus,
  faSearchMinus,
  faTemperatureHigh
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faChevronCircleDown,
  faChevronCircleRight,
  faDownload,
  faEdit,
  faPen,
  faSearch,
  faUserCircle,
  faPlus,
  faTrash,
  faTimes,
  faArrowsAltV,
  faArrowsAltH,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faSearchPlus,
  faSearchMinus,
  faTemperatureHigh
)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
