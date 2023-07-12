import React from 'react';

import './styles/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import useSetToken from './hooks/useSetToken';
import GlobalCSS from './styles/global.css';
import ErrorPage from './views/ErrorPage';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import RegisterPage from './views/RegisterPage';

const App = () => {
  useSetToken();

  return (
    <BrowserRouter>
      <div className="App">
        <GlobalCSS />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
