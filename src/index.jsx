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
)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
