import React from 'react';

import { useAtom } from 'jotai';
import { Col, Container, Row } from 'react-bootstrap';
import { BiTimeFive } from 'react-icons/bi';
import { TbCalendarUp, TbCalendarX } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';

import timeRangeAtom from '../atoms/timeRange.atom';
import ReserverParkingCard from '../components/cards/ReserveParkingCard';
import Header from '../components/utils/Header';
import getDurationInWords from '../functions/getDurationInWords';
import IParking from '../interfaces/IParking';

const ReserveParkingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [timeRange] = useAtom(timeRangeAtom);

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
            <div className="shadow-sm border py-2">
              <p className="fs-1 m-4">Booking details</p>
              <div className="d-flex m-4 justify-content-between">
                <div>
                  <p className="fs-4 my-2">
                    <TbCalendarUp className="me-3 mb-1" /> Arriving on
                  </p>
                  <p className="fs-4 my-2">
                    <TbCalendarX className="me-3 mb-1" /> Leaving on
                  </p>
                  <p className="fs-4 my-2">
                    <BiTimeFive className="me-3 mb-1" /> Duration
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="fs-4 my-2">{timeRange.startTime}</p>
                  <p className="fs-4 my-2">{timeRange.endTime}</p>
                  <p className="fs-4 my-2">
                    {getDurationInWords(timeRange.startTime, timeRange.endTime)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 shadow-sm border"></div>
          </Col>
          <Col lg={4}>
            <ReserverParkingCard parking={parking} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReserveParkingPage;
