import React from 'react';

import { Alert, Col, Row } from 'react-bootstrap';

import DashboardTopInformation from './DashboardTopInformation';
import IDashboardResponse from '../../interfaces/IDashboardResponse';
import CenteredItems from '../../styles/CenteredItems';
import TimeFrameType from '../../types/TimeFrameType';
import CustomPieChart from '../charts/CustomPieChart';
import SalesChart from '../charts/SalesChart';
import ParkingsInput from '../inputs/ParkingsInput';
import TimeFrameSelectInput from '../inputs/TimeFrameSelectInput';
import ReservationsTable from '../tables/ReservationsTable';

interface Props {
  setSelectedParking: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTimeFrame: React.Dispatch<React.SetStateAction<TimeFrameType>>;
  dashboardResponse: IDashboardResponse;
}

const DashboardInformation = ({
  dashboardResponse,
  setSelectedParking,
  setSelectedTimeFrame
}: Props) => {
  return (
    <>
      <p className="fs-1 text-center mt-3">Reservations analysis</p>
      <Row>
        <Col>
          <ParkingsInput setSelectedParking={setSelectedParking} />
        </Col>
        <Col>
          <TimeFrameSelectInput setSelectedTimeFrame={setSelectedTimeFrame} />
        </Col>
      </Row>
      <DashboardTopInformation dashboardResponse={dashboardResponse} />
      <Row className="mt-4">
        <Col className="w-100 h-100">
          <p className="fs-2 text-center">Sales amount</p>
          {dashboardResponse.sales.length <= 1 && (
            <Alert variant="info" className="text-center">
              More data needed to visualize the information
            </Alert>
          )}
          <SalesChart
            data={dashboardResponse.sales}
            lines={['current', 'prev']}
          />
        </Col>
        <Col className="">
          <CenteredItems flexColumn>
            <div className="w-100 shadow-sm border mb-3">
              <p className="fs-2 text-center">Locations</p>
              <CustomPieChart data={dashboardResponse.locations} />
            </div>
            <div className="w-100 shadow-sm border">
              <p className="fs-2 text-center">
                Free spaces{' '}
                <span style={{ fontSize: '0.5em' }}>(for last hour)</span>
              </p>
              <CustomPieChart data={dashboardResponse.freeSpaces} />
            </div>
          </CenteredItems>
        </Col>
      </Row>
      <p className="fs-1 mt-4">Parking reservations</p>
      <ReservationsTable
        isPersonal={false}
        reservations={dashboardResponse.reservations}
      />
    </>
  );
};

export default DashboardInformation;
