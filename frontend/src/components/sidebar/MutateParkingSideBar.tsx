/* eslint-disable multiline-ternary */
import React from 'react';

import { useAtomValue } from 'jotai';
import { Col, Row } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';

import parkingForEditAtom from '../../atoms/parkingForEdit.atom';
import AddSpaceButton from '../buttons/parking-space/AddSpaceButton';
import DeleteSpaceButton from '../buttons/parking-space/DeleteSpaceButton';
import RotateSpaceButton from '../buttons/parking-space/RotateSpaceButton';
import MutateParkingForm from '../forms/MutateParkingForm';

const MutateParkingSideBar = () => {
  const parkingForEdit = useAtomValue(parkingForEditAtom);

  return (
    <Fade bottom>
      <>
        <div className="text-center text-black fs-3 my-4">
          {parkingForEdit !== null ? (
            <p>Editing parking &quot;{parkingForEdit.title}&quot;</p>
          ) : (
            <p>Creating new parking</p>
          )}
        </div>
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
        <MutateParkingForm />
      </>
    </Fade>
  );
};

export default MutateParkingSideBar;
