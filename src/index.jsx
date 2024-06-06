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
  faList,
  faLock,
  faLockOpen,
  faSearch,
  faUserCircle,
  faPlus,
  faTrash,
  faArrowsAlt,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faSearchPlus,
  faSearchMinus,
  faSort,
  faSortUp,
  faSortDown,
  faTemperatureHigh,
  faSignOut,
  faUndoAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBars,
  faChevronCircleDown,
  faChevronCircleRight,
  faDownload,
  faEdit,
  faFilter,
  faPen,
  faList,
  faLock,
  faLockOpen,
  faSearch,
  faUserCircle,
  faPlus,
  faTrash,
  faArrowsAlt,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faSearchPlus,
  faSearchMinus,
  faSort,
  faSortUp,
  faSortDown,
  faTemperatureHigh,
  faSignOut,
  faUndoAlt,
  faTimes
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
