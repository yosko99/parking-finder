import React from 'react';

import { Col, Row } from 'react-bootstrap';

import DashboardStatisticBox from './DashboardStatisticBox';
import getDurationInWords from '../../functions/getDurationInWords';
import IDashboardResponse from '../../interfaces/IDashboardResponse';

interface Props {
  dashboardResponse: IDashboardResponse;
}

const DashboardTopInformation = ({ dashboardResponse }: Props) => {
  return (
    <Row className="text-uppercase mt-4">
      <Col className="shadow-sm p-3 m-2 border">
        <DashboardStatisticBox
          title="Total Sales"
          firstValue={dashboardResponse.totalSales.current}
          secondValue={dashboardResponse.totalSales.prev}
        />
      </Col>
      <Col className="shadow-sm p-3 m-2 border">
        <DashboardStatisticBox
          title="Total Reservations"
          firstValue={dashboardResponse.totalReservations.current}
          secondValue={dashboardResponse.totalReservations.prev}
        />
      </Col>
      <Col className="shadow-sm p-3 m-2 border">
        <DashboardStatisticBox
          title="Average Sales"
          firstValue={dashboardResponse.averageSales.current}
          secondValue={dashboardResponse.averageSales.prev}
        />
      </Col>
      <Col className="shadow-sm p-3 m-2 border">
        <p className="mb-2">Average Duration</p>
        <p className="fs-4 mb-0" style={{ fontWeight: 'bold' }}>
          {getDurationInWords(dashboardResponse.averageDuration.current)}
        </p>
        <hr className="m-0 my-1" />
        <p className="text-muted mb-2">Previous period</p>
        <p className="fs-4 mb-0 text-muted" style={{ fontWeight: 'bold' }}>
          {getDurationInWords(dashboardResponse.averageDuration.prev)}
        </p>
      </Col>
    </Row>
  );
};

export default DashboardTopInformation;
