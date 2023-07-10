import React from 'react';

import './styles/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalCSS from './styles/global.css';
import MainPage from './views/MainPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalCSS />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
