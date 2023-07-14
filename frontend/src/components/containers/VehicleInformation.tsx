/* eslint-disable multiline-ternary */
import React from 'react';

import { Button, Form } from 'react-bootstrap';

import ICarRegistration from '../../interfaces/ICarRegistration';
import CenteredItems from '../../styles/CenteredItems';

interface Props {
  setRegistrationNumber: React.Dispatch<React.SetStateAction<ICarRegistration>>;
  registrationNumber: ICarRegistration;
}

const VehicleInformation = ({
  registrationNumber,
  setRegistrationNumber
}: Props) => {
  const handleAddNumber = () => {
    setRegistrationNumber((value) => {
      return { ...value, isSubmitted: true };
    });
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    setRegistrationNumber((value) => {
      return { ...value, number: target.value };
    });
  };

  return (
    <div className="shadow-sm border py-2 mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <p className="fs-2 m-4">Vehicle information</p>

        {registrationNumber.isSubmitted && (
          <p
            role="button"
            onClick={() =>
              setRegistrationNumber((value) => {
                return { ...value, isSubmitted: false };
              })
            }
            className="text-success m-4 fs-5"
            style={{ textDecoration: 'underline' }}
          >
            Change
          </p>
        )}
      </div>
      {!registrationNumber.isSubmitted ? (
        <Form.Group className="mx-4 my-2">
          <Form.Label>Your registration number</Form.Label>
          <Form.Control
            type="inv"
            className="border"
            required
            value={registrationNumber.number}
            // @ts-ignore
            onChange={handleChange}
            name="registrationNumber"
            placeholder="X9999XX"
            minLength={7}
            maxLength={9}
          />
          <div className="d-flex justify-content-end w-100 mt-3">
            <Button onClick={handleAddNumber} variant="success w-25 rounded">
              Add
            </Button>
          </div>
        </Form.Group>
      ) : (
        <CenteredItems
          className="border m-4 shadow-sm"
          style={{ backgroundColor: '#eceeef' }}
        >
          <p
            className="text-uppercase p-4 m-0 fs-3"
            style={{ fontWeight: 'bold', cursor: 'default' }}
          >
            {registrationNumber.number}
          </p>
        </CenteredItems>
      )}
    </div>
  );
};

export default VehicleInformation;
