import React from 'react';

import { Button } from 'react-bootstrap';

import IParking from '../../interfaces/IParking';
import ParkingInfoBody from '../modal-bodies/parking-info/ParkingInfoTabBody';
import CustomModal from '../utils/CustomModal';

interface Props {
  parking: IParking;
}

const ParkingInfoModal = ({ parking }: Props) => {
  return (
    <CustomModal
      activateButtonElement={<Button variant="info">Info</Button>}
      modalHeader="Parking info"
      modalBody={<ParkingInfoBody parking={parking} />}
    />
  );
};

export default ParkingInfoModal;
