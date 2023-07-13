import React, { useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import { useLocation, useNavigate } from 'react-router-dom';

import ReserverParkingCard from '../components/cards/ReserveParkingCard';
import BookingDetails from '../components/containers/BookingDetails';
import VehicleInformation from '../components/containers/VehicleInformation';
import Header from '../components/utils/Header';
import IParking from '../interfaces/IParking';

const ReserveParkingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [registrationNumber, setRegistrationNumber] = useState('');

  if (location.state === null || location.state?.parking === null) {
    navigate('/');
  }

  const parking = location.state.parking as IParking;

  return (
    <div>
      <Header />
      <Container>
        <p className="display-5 my-4">Confirm your reservation and pay</p>

        <Row>
          <Col lg={8}>
            <Fade left>
              <BookingDetails />
              <VehicleInformation
                registrationNumber={registrationNumber}
                setRegistrationNumber={setRegistrationNumber}
              />
            </Fade>
          </Col>
          <Col lg={4}>
            <Fade right>
              <ReserverParkingCard parking={parking} />
            </Fade>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReserveParkingPage;
