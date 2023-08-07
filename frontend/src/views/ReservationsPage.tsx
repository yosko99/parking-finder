/* eslint-disable multiline-ternary */
import React from 'react';

import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Header from '../components/navigation/Header';
import ReservationsTable from '../components/tables/ReservationsTable';
import LoadingSpinner from '../components/utils/LoadingSpinner';
import { getCurrentUserReservationsRoute } from '../constants/apiRoute';
import useFetch from '../hooks/useFetch';
import IReservation from '../interfaces/IReservation';

const ReservationsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch(
    'current-user-reservations',
    getCurrentUserReservationsRoute(),
    true,
    true
  );

  if (error) {
    navigate('/404');
  }

  const reservations = data as IReservation[];

  return (
    <div>
      <Header />
      <Container>
        <p className="display-5 mt-3 mb-0">My reservations</p>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ReservationsTable isPersonal reservations={reservations} />
        )}
      </Container>
    </div>
  );
};

export default ReservationsPage;
