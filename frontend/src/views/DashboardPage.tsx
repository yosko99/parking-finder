/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useAtom } from 'jotai';
import { Col, Container, Row } from 'react-bootstrap';

import tokenAtom from '../atoms/token.atom';
import CustomLineChart from '../components/charts/CustomLineChart';
import CustomPieChart from '../components/charts/CustomPieChart';
import DashboardTopInformation from '../components/containers/DashboardTopInformation';
import ParkingsInput from '../components/inputs/ParkingsInput';
import TimeFrameSelectInput from '../components/inputs/TimeFrameSelectInput';
import Header from '../components/utils/Header';
import { getCurrentUserDashboardRoute } from '../constants/apiRoute';
import defaultDashboardResponseData from '../data/defaultDashboardResponseData';
import IDashboardResponse from '../interfaces/IDashboardResponse';
import CenteredItems from '../styles/CenteredItems';
import TimeFrameType from '../types/TimeFrameType';

const DashboardPage = () => {
  const [token] = useAtom(tokenAtom);
  const [selectedParking, setSelectedParking] = useState('');
  const [selectedTimeFrame, setSelectedTimeFrame] =
    useState<TimeFrameType>('DAY');

  const [dashboardResponse, setDashboardResponse] =
    useState<IDashboardResponse>(defaultDashboardResponseData);

  useEffect(() => {
    if (selectedParking !== '') {
      axios
        .get(getCurrentUserDashboardRoute(selectedParking, selectedTimeFrame), {
          headers: { authorization: 'Bearer ' + token }
        })
        .then((response) => {
          setDashboardResponse(response.data);
        });
    }
  }, [selectedParking, selectedTimeFrame]);

  return (
    <div>
      <Header />
      <Container>
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
            <CustomLineChart data={dashboardResponse.sales} />
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
      </Container>
    </div>
  );
};

export default DashboardPage;
