import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotificationContext from "./contexts/NotificationContext";

import Login from "./components/views/Login";
import ReactionIndex from "./components/views/ReactionIndex";
import Reaction from "./components/views/Reaction";
import MainHeader from "./components/layout/MainHeader";
import GlobalNotification from "./components/layout/GlobalNotification";

import "./css/chemotion_theme.scss";

const App = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };
  return (
    <BrowserRouter className="App">
      <NotificationContext.Provider value={{ notifications, addNotification }}>
        <GlobalNotification />
        <MainHeader />
        <Routes>
          <Route path="/" exact={true} element={<Login />} />
          <Route path="/reactions" exact={true} element={<ReactionIndex />} />
          <Route path="/reactions/:reactionId" element={<Reaction />} />
        </Routes>
      </NotificationContext.Provider>
    </BrowserRouter>
  );
};

export default App;
