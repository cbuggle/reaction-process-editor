import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faChevronCircleDown,
  faChevronCircleRight,
  faDownload,
  faEdit,
  faFilter,
  faPen,
  faLock,
  faLockOpen,
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
  faSort,
  faSortUp,
  faSortDown,
  faTemperatureHigh,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBars,
  faChevronCircleDown,
  faChevronCircleRight,
  faDownload,
  faEdit,
  faFilter,
  faPen,
  faLock,
  faLockOpen,
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
  faSort,
  faSortUp,
  faSortDown,
  faTemperatureHigh,
  faSignOut
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
