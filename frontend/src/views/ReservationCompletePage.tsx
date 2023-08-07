import React from 'react';

import { Button, Container } from 'react-bootstrap';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../components/navigation/Header';
import CenteredItems from '../styles/CenteredItems';

const ReservationCompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.state === null) {
    navigate('/');
  }

  return (
    <div>
      <Header />
      <Container>
        <CenteredItems className="mt-5" flexColumn>
          <p style={{ fontWeight: 'bold' }} className="fs-2">
            Reservation completed!
          </p>

          <hr className="bg-dark text-black w-100" />
          <IoIosCheckmarkCircleOutline size={80} className="text-info" />
          <p className="mt-2 fs-3 text-info">Thank you!</p>
          <p className="m-0">
            Your reservation detail has been sent to your email.
          </p>
          <p>
            You can check your reservations from{' '}
            <span style={{ fontWeight: 'bold' }}>
              &quot;My reservations&quot;
            </span>{' '}
            tab, or by pressing the button below.
          </p>
          <Button onClick={() => navigate('/reservations')} variant="info">
            My reservations
          </Button>
        </CenteredItems>
      </Container>
    </div>
  );
};

export default ReservationCompletePage;
