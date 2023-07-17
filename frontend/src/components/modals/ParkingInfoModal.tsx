import React from 'react';

import { Button } from 'react-bootstrap';

import IParking from '../../interfaces/IParking';
import ParkingInfoTabBody from '../modalBodies/ParkingInfoTabBody';
import CustomModal from '../utils/CustomModal';

interface Props {
  parking: IParking;
}

const ParkingInfoModal = ({ parking }: Props) => {
  return (
    <CustomModal
      activateButtonElement={<Button variant="info">Info</Button>}
      modalHeader="Parking info"
      modalBody={<ParkingInfoTabBody parking={parking} />}
    />
  );
};

export default ParkingInfoModal;
