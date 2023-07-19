import React from 'react';

import { Col, Row } from 'react-bootstrap';

import getDurationInWords from '../../functions/getDurationInWords';
import IDashboardResponse from '../../interfaces/IDashboardResponse';

interface Props {
  dashboardResponse: IDashboardResponse;
}

const DashboardTopInformation = ({ dashboardResponse }: Props) => {
  return (
    <Row className="text-uppercase mt-4">
      <Col className="shadow-sm p-3 m-2 border">
        <p>Total Sales</p>
        <p className="fs-4 mb-0" style={{ fontWeight: 'bold' }}>
          $ {dashboardResponse.totalSales.current.toFixed(2)}
        </p>
        <hr className="m-0 my-1" />
        <p className="fs-4 mb-0" style={{ fontWeight: 'bold' }}>
          $ {dashboardResponse.totalSales.prev.toFixed(2)}
        </p>
      </Col>
      <Col className="shadow-sm p-3 m-2 border">
        <p>TOTAL RESERVATIONS</p>
        <p className="fs-4 mb-0" style={{ fontWeight: 'bold' }}>
          {dashboardResponse.totalReservations.current}
        </p>
        <hr className="m-0 my-1" />
        <p className="fs-4 mb-0" style={{ fontWeight: 'bold' }}>
          {dashboardResponse.totalReservations.prev}
        </p>
      </Col>
      <Col className="shadow-sm p-3 m-2 border">
        <p>Average Sales</p>
        <p className="fs-4 mb-0" style={{ fontWeight: 'bold' }}>
          $ {dashboardResponse.averageSales.current.toFixed(2)}
        </p>
        <hr className="m-0 my-1" />
        <p className="fs-4 mb-0" style={{ fontWeight: 'bold' }}>
          $ {dashboardResponse.averageSales.prev.toFixed(2)}
        </p>
      </Col>
      <Col className="shadow-sm p-3 m-2 border">
        <p>Average Duration</p>
        <p className="fs-4 mb-0" style={{ fontWeight: 'bold' }}>
          {getDurationInWords(dashboardResponse.averageDuration.current)}
        </p>
        <hr className="m-0 my-1" />
        <p className="fs-4 mb-0" style={{ fontWeight: 'bold' }}>
          {getDurationInWords(dashboardResponse.averageDuration.prev)}
        </p>
      </Col>
    </Row>
  );
};

export default DashboardTopInformation;
