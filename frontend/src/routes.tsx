import React, { Suspense, lazy } from 'react';

import { Route, Routes } from 'react-router-dom';

import LoadingPage from './views/LoadingPage';

const MainPage = lazy(() => import('./views/MainPage'));
const ErrorPage = lazy(() => import('./views/ErrorPage'));
const RegisterPage = lazy(() => import('./views/RegisterPage'));
const DashboardPage = lazy(() => import('./views/DashboardPage'));
const LoginPage = lazy(() => import('./views/LoginPage'));
const ReservationsPage = lazy(() => import('./views/ReservationsPage'));
const ReserveParkingPage = lazy(() => import('./views/ReserveParkingPage'));
const ReservationCompletePage = lazy(
  () => import('./views/ReservationCompletePage')
);

const AppRoutes = () => (
  <Suspense fallback={<LoadingPage />}>
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
  </Suspense>
);

export default AppRoutes;
