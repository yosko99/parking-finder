import React from 'react';

import { Col, Row } from 'react-bootstrap';

import Map from '../components/Map';
import ParkingSideBar from '../components/ParkingSideBar';
import Header from '../components/utils/Header';

const MainPage = () => {
  return (
    <>
      <Header />
      <Row>
        <Col lg={9} className="p-0">
          <Map />
        </Col>
        <Col lg={3} className="m-0 p-0 bg-dark text-white">
          <ParkingSideBar />
        </Col>
      </Row>
    </>
  );
};

export default MainPage;
