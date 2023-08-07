/* eslint-disable multiline-ternary */
import React from 'react';

import { Tab, Tabs } from 'react-bootstrap';

import ParkingDescriptionTab from './tabs/ParkingDescriptionTab';
import ParkingInfoTab from './tabs/ParkingInfoTab';
import ParkingReviewsTab from './tabs/ParkingReviewsTab';
import IParking from '../../../interfaces/IParking';

interface Props {
  parking: IParking;
}

const ParkingInfoBody = ({ parking }: Props) => {
  return (
    <>
      <Tabs defaultActiveKey="info" className="mb-3 w-100" justify>
        <Tab eventKey="info" title="Info">
          <ParkingInfoTab parking={parking} />
        </Tab>
        <Tab eventKey="description" title="Description">
          <ParkingDescriptionTab description={parking.description} />
        </Tab>
        <Tab eventKey="reviews" title="Reviews">
          <ParkingReviewsTab parking={parking} />
        </Tab>
      </Tabs>
    </>
  );
};

export default ParkingInfoBody;
