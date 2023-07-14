/* eslint-disable multiline-ternary */
import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import { useLocation, useNavigate } from 'react-router-dom';

import ReserverParkingCard from '../components/cards/ReserveParkingCard';
import ReserveParkingForm from '../components/forms/ReserveParkingForm';
import Header from '../components/utils/Header';
import IParking from '../interfaces/IParking';

const ReserveParkingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.state === null || location.state?.parking === null) {
    navigate('/');
  }

  const parking = location.state.parking as IParking;

  return (
    <div>
      <Header />
      <Container>
        <p className="fs-1 my-4" style={{ fontWeight: 'bold' }}>
          Confirm your reservation and pay
        </p>

        <Row>
          <Col lg={4}>
            <Fade left>
              <ReserverParkingCard parking={parking} />
            </Fade>
          </Col>
          <Col lg={8}>
            <Fade right>
              <ReserveParkingForm parking={parking} />
            </Fade>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReserveParkingPage;
