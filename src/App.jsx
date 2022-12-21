import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './components/views/Login'
import ReactionIndex from './components/views/ReactionIndex';
import Reaction from './components/views/Reaction';
import MainHeader from './components/layout/MainHeader';

import './css/App.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter className="App">
      <ToastContainer enableMultiContainer={true} />
      <MainHeader />
      <Routes>
        <Route path="/" exact={true} element={<Login />} />
        <Route path="/reactions" exact={true} element={<ReactionIndex />} />
        <Route path="/reactions/:reactionId" element={<Reaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
