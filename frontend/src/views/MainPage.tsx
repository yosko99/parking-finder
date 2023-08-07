import React from 'react';

import { Col, Row } from 'react-bootstrap';

import MainMap from '../components/maps/MainMap';
import Header from '../components/navigation/Header';
import SideBar from '../components/sidebar/SideBar';
import useAuth from '../hooks/useAuth';

const MainPage = () => {
  useAuth('/login');

  return (
    <>
      <Header />
      <Row style={{ width: '100vw', overflowY: 'hidden' }}>
        <Col lg={9} xs={12}>
          <MainMap />
        </Col>
        <Col lg={3} xs={12} className="m-0 p-0 text-white">
          <SideBar />
        </Col>
      </Row>
    </>
  );
};

export default MainPage;
