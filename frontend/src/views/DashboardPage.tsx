/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useAtom } from 'jotai';
import { Container } from 'react-bootstrap';

import isAddParkingToggledAtom from '../atoms/isAddParkingToggledAtom.atom';
import tokenAtom from '../atoms/token.atom';
import DashboardInformation from '../components/containers/DashboardInformation';
import Footer from '../components/utils/Footer';
import Header from '../components/utils/Header';
import { getCurrentUserDashboardRoute } from '../constants/apiRoute';
import defaultDashboardResponseData from '../data/defaultDashboardResponseData';
import IDashboardResponse from '../interfaces/IDashboardResponse';
import TimeFrameType from '../types/TimeFrameType';

const DashboardPage = () => {
  const [token] = useAtom(tokenAtom);
  const [selectedParking, setSelectedParking] = useState('');
  const [selectedTimeFrame, setSelectedTimeFrame] =
    useState<TimeFrameType>('DAY');
  const [isAddMarkerToggled, setIsAddMarkerToggled] = useAtom(
    isAddParkingToggledAtom
  );

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

  useEffect(() => {
    setIsAddMarkerToggled(false);
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <DashboardInformation
          dashboardResponse={dashboardResponse}
          setSelectedParking={setSelectedParking}
          setSelectedTimeFrame={setSelectedTimeFrame}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default DashboardPage;
