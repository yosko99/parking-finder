/* eslint-disable multiline-ternary */
import React from 'react';

import { useAtom } from 'jotai';
import { Col, Container, Row } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import { useLocation, useNavigate } from 'react-router-dom';

import selectedParkingSpaceIndexAtom from '../atoms/selectedParkingSpaceIndex.atom';
import timeRangeAtom from '../atoms/timeRange.atom';
import ReserverParkingCard from '../components/cards/ReserveParkingCard';
import BookingDetails from '../components/containers/BookingDetails';
import ReserveParkingForm from '../components/forms/ReserveParkingForm';
import Header from '../components/navigation/Header';
import LoadingSpinner from '../components/utils/LoadingSpinner';
import { getParkingFreeSpacesWithinTimeFrame } from '../constants/apiRoute';
import useFetch from '../hooks/useFetch';
import IParking from '../interfaces/IParking';

const ReserveParkingPage = () => {
  const [selectedParkingSpaceIndex] = useAtom(selectedParkingSpaceIndexAtom);
  const [timeRange] = useAtom(timeRangeAtom);

  const location = useLocation();
  const navigate = useNavigate();

  if (
    location.state === null ||
    location.state?.parking === null ||
    selectedParkingSpaceIndex === -1
  ) {
    navigate('/');
  }

  const parking = location.state.parking as IParking;

  const { data: freeSpaces, isLoading } = useFetch(
    `${parking.id}-free-spaces-${timeRange.startTime}-${timeRange.endTime}`,
    getParkingFreeSpacesWithinTimeFrame(
      parking.id,
      timeRange.startTime,
      timeRange.endTime
    ),
    true,
    false
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
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <ReserverParkingCard
                  parking={parking}
                  freeSpaces={freeSpaces}
                />
              )}
            </Fade>
          </Col>
          <Col lg={8}>
            <Fade right>
              <BookingDetails
                selectedParkingSpaceIndex={selectedParkingSpaceIndex}
              />
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <ReserveParkingForm
                  parking={parking}
                  selectedParkingSpaceIndex={selectedParkingSpaceIndex}
                  canReserve={freeSpaces !== 0}
                />
              )}
            </Fade>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReserveParkingPage;
