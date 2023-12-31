/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useAtom } from 'jotai';
import { Container, Image } from 'react-bootstrap';

import noParkingImg from '../assets/no-parking.png';
import tokenAtom from '../atoms/token.atom';
import DashboardInformation from '../components/containers/DashboardInformation';
import Header from '../components/navigation/Header';
import Footer from '../components/utils/Footer';
import LoadingSpinner from '../components/utils/LoadingSpinner';
import {
  getCurrentUserDashboardRoute,
  getCurrentUserParkingsRoute
} from '../constants/apiRoute';
import defaultDashboardResponseData from '../data/defaultDashboardResponseData';
import useFetch from '../hooks/useFetch';
import useResetParkingIndexes from '../hooks/useResetParkingIndexes';
import IDashboardResponse from '../interfaces/IDashboardResponse';
import IParking from '../interfaces/IParking';
import CenteredItems from '../styles/CenteredItems';
import TimeFrameType from '../types/TimeFrameType';

const DashboardPage = () => {
  useResetParkingIndexes();
  const [token] = useAtom(tokenAtom);
  const [selectedParking, setSelectedParking] = useState('');
  const [selectedTimeFrame, setSelectedTimeFrame] =
    useState<TimeFrameType>('DAY');

  const { data, isLoading } = useFetch(
    'current-user-parkings',
    getCurrentUserParkingsRoute(),
    true,
    true
  );

  const parkings = data as IParking[];

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
    <>
      <Header />
      <Container>
        {isLoading ? (
          <LoadingSpinner height="95vh" />
        ) : parkings.length === 0 ? (
          <CenteredItems flexColumn style={{ height: '95vh' }}>
            <Image src={noParkingImg} />
            <p className="text-center m-0 fs-1">
              Currently you do not have any parkings but you can add some
            </p>
          </CenteredItems>
        ) : (
          <DashboardInformation
            parkings={parkings}
            selectedParking={selectedParking}
            dashboardResponse={dashboardResponse}
            setSelectedParking={setSelectedParking}
            setSelectedTimeFrame={setSelectedTimeFrame}
          />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default DashboardPage;
