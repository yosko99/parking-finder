import React, { useState } from 'react';

import { useAtom } from 'jotai';
import { Button, Col, Container, Row } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import { useLocation, useNavigate } from 'react-router-dom';

import timeRangeAtom from '../atoms/timeRange.atom';
import ReserverParkingCard from '../components/cards/ReserveParkingCard';
import BookingDetails from '../components/containers/BookingDetails';
import PaymentInformation from '../components/containers/PaymentInformation';
import VehicleInformation from '../components/containers/VehicleInformation';
import Header from '../components/utils/Header';
import { TRANSACTION_FEE } from '../constants/prices';
import calculateTotalPrice from '../functions/calculateTotalPrice';
import IParking from '../interfaces/IParking';

const ReserveParkingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [registrationNumber, setRegistrationNumber] = useState('');
  const [timeRange] = useAtom(timeRangeAtom);

  if (location.state === null || location.state?.parking === null) {
    navigate('/');
  }

  const parking = location.state.parking as IParking;

  const totalPrice = calculateTotalPrice(
    timeRange.startTime,
    timeRange.endTime,
    parking.hourlyPrice
  );

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
              <BookingDetails />
              <VehicleInformation
                registrationNumber={registrationNumber}
                setRegistrationNumber={setRegistrationNumber}
              />
              <PaymentInformation />
              <Button
                className="mt-3 w-100 rounded fs-4 mt-2 mb-4 text-capitalize"
                variant="success"
              >
                ${(totalPrice + TRANSACTION_FEE).toFixed(2)}- Pay now and
                reserve
              </Button>
            </Fade>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReserveParkingPage;
