import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from './components/login/LoginForm'

import './css/App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" exact={true} element={<LoginForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
