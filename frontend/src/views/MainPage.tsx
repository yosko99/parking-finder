import React from 'react';

import { Col, Row } from 'react-bootstrap';

import Map from '../components/Map';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/utils/Header';
import useAuth from '../hooks/useAuth';

const MainPage = () => {
  useAuth('/login');

  return (
    <>
      <Header />
      <Row>
        <Col lg={9} className="p-0">
          <Map />
        </Col>
        <Col lg={3} className="m-0 p-0 bg-dark text-white">
          <SideBar />
        </Col>
      </Row>
    </>
  );
};

export default MainPage;
