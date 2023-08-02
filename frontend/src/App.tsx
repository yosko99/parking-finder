import React from 'react';

import './styles/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import CustomToast from './components/utils/CustomToast';
import useSetToken from './hooks/useSetToken';
import GlobalCSS from './styles/global.css';
import DashboardPage from './views/DashboardPage';
import ErrorPage from './views/ErrorPage';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import RegisterPage from './views/RegisterPage';
import ReservationCompletePage from './views/ReservationCompletePage';
import ReservationsPage from './views/ReservationsPage';
import ReserveParkingPage from './views/ReserveParkingPage';

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
          <Route path="/reserve-parking" element={<ReserveParkingPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route
            path="/reservation-complete"
            element={<ReservationCompletePage />}
          />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <CustomToast />
      </div>
    </BrowserRouter>
  );
};

export default App;
