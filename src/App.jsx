import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import LoginForm from './components/login/LoginForm'
import ReactionIndex from './components/reactions/ReactionIndex';
import Reaction from './components/reactions/Reaction';
import MainNavbar from './components/navbars/MainNavbar';

import './css/App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter className="App">
      <ToastContainer enableMultiContainer={true} />
      <MainNavbar />
      <Routes>
        <Route path="/" exact={true} element={<LoginForm />} />
        <Route path="/reactions" exact={true} element={<ReactionIndex />} />
        <Route path="/reactions/:reactionId" element={<Reaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
