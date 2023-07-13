/* eslint-disable multiline-ternary */
import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';

import CenteredItems from '../../styles/CenteredItems';

interface Props {
  setRegistrationNumber: React.Dispatch<React.SetStateAction<string>>;
  registrationNumber: string;
}

const VehicleInformation = ({
  registrationNumber,
  setRegistrationNumber
}: Props) => {
  const [isSubmited, setIsSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="shadow-sm border py-2 mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <p className="fs-2 m-4">Vehicle information</p>

        {isSubmited && (
          <p
            role="button"
            onClick={() => setIsSubmitted(false)}
            className="text-success m-4 fs-5"
            style={{ textDecoration: 'underline' }}
          >
            Change
          </p>
        )}
      </div>
      {!isSubmited ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mx-4 my-2">
            <Form.Label>Your registration number</Form.Label>
            <Form.Control
              type="text"
              className="border"
              required
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              name="registrationNumber"
              placeholder="X9999XX"
              minLength={7}
              maxLength={9}
            />
            <div className="d-flex justify-content-end w-100 mt-3">
              <Button type="submit" variant="success w-25 rounded">
                Add
              </Button>
            </div>
          </Form.Group>
        </Form>
      ) : (
        <CenteredItems
          className="border m-4 shadow-sm"
          style={{ backgroundColor: '#eceeef' }}
        >
          <p
            className="text-uppercase p-4 m-0 fs-3"
            style={{ fontWeight: 'bold', cursor: 'default' }}
          >
            {registrationNumber}
          </p>
        </CenteredItems>
      )}
    </div>
  );
};

export default VehicleInformation;
