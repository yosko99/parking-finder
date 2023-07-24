import React from 'react';

import { Col, Row } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';

import AddSpaceButton from '../buttons/parking-space/AddSpaceButton';
import DeleteSpaceButton from '../buttons/parking-space/DeleteSpaceButton';
import RotateSpaceButton from '../buttons/parking-space/RotateSpaceButton';
import AddParkingForm from '../forms/AddParkingForm';

const AddParkingSideBar = () => {
  return (
    <Fade bottom>
      <>
        <Row className="m-3">
          <Col>
            <AddSpaceButton />
          </Col>
          <Col>
            <DeleteSpaceButton />
          </Col>
        </Row>
        <Row className="m-3">
          <Col>
            <RotateSpaceButton isClockwise={false} />
          </Col>
          <Col>
            <RotateSpaceButton isClockwise />
          </Col>
        </Row>
        <AddParkingForm />
      </>
    </Fade>
  );
};

export default AddParkingSideBar;
