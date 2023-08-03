import React from 'react';

import { Col, Row } from 'react-bootstrap';

import IParking from '../../../../interfaces/IParking';
import DeleteParkingButton from '../../../buttons/parking/DeleteParkingButton';
import EditParkingButton from '../../../buttons/parking/EditParkingButton';

interface Props {
  parking: IParking;
}

const ParkingInfoTab = ({ parking }: Props) => {
  return (
    <>
      <p className="text-center fs-3">Information</p>
      <div className="d-flex mx-3 justify-content-between">
        <div>
          <p>Title:</p>
          <p>Distance:</p>
          <p>Duration:</p>
          <p>Hourly fee:</p>
          <p>Total spaces:</p>
          <p>Free spaces:</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p>{parking.title}</p>
          <p>{parking.distance}</p>
          <p>{parking.duration}</p>
          <p>{parking.hourlyPrice}$</p>
          <p>{parking.parkingSize}</p>
          <p>{parking.freeSpaces}</p>
        </div>
      </div>
      {parking.canUserEdit && (
        <Row>
          <Col>
            <EditParkingButton parking={parking} />
          </Col>
          <Col>
            <DeleteParkingButton parkingId={parking.id} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default ParkingInfoTab;
