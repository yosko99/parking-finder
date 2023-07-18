/* eslint-disable multiline-ternary */
import React, { useState } from 'react';

import axios from 'axios';
import { useAtom } from 'jotai';
import { Col, Container, Row } from 'react-bootstrap';

import tokenAtom from '../atoms/token.atom';
import CustomLineChart from '../components/charts/CustomLineChart';
import CustomPieChart from '../components/charts/CustomPieChart';
import DashboardTopInformation from '../components/containers/DashboardTopInformation';
import ParkingsInput from '../components/inputs/ParkingsInput';
import Header from '../components/utils/Header';
import { getCurrentUserDashboardRoute } from '../constants/apiRoute';
import defaultDashboardResponseData from '../data/defaultDashboardResponseData';
import IDashboardResponse from '../interfaces/IDashboardResponse';
import CenteredItems from '../styles/CenteredItems';

const DashboardPage = () => {
  const [token] = useAtom(tokenAtom);

  const [dashboardResponse, setDashboardResponse] =
    useState<IDashboardResponse>(defaultDashboardResponseData);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== '') {
      axios
        .get(getCurrentUserDashboardRoute(e.target.value, 'WEEK'), {
          headers: { authorization: 'Bearer ' + token }
        })
        .then((response) => {
          setDashboardResponse(response.data);
        });
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <p className="display-5 text-center mt-5">Reservations analysis</p>
        <ParkingsInput handleChange={handleChange} />
        <DashboardTopInformation dashboardResponse={dashboardResponse} />
        <Row className="mt-4">
          <Col className="w-100 h-100">
            <p className="fs-2 text-center">Sales</p>
            <CustomLineChart data={dashboardResponse.sales} />
          </Col>
          <Col className="">
            <CenteredItems flexColumn>
              <div className="w-100 shadow-sm border mb-3">
                <p className="fs-2 text-center">Locations</p>
                <CustomPieChart data={dashboardResponse.locations} />
              </div>
              <div className="w-100 shadow-sm border">
                <p className="fs-2 text-center">Free spaces</p>
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
