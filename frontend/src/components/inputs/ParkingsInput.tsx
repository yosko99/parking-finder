/* eslint-disable multiline-ternary */
import React from 'react';

import { Form } from 'react-bootstrap';

import IParking from '../../interfaces/IParking';

interface Props {
  setSelectedParking: React.Dispatch<React.SetStateAction<string>>;
  parkings: IParking[];
}

const ParkingsInput = ({ parkings, setSelectedParking }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedParking(e.target.value);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Parkings</Form.Label>
      <Form.Select name="parking" onChange={handleChange}>
        <option value={''}></option>
        {parkings.map((parking, index) => (
          <option value={parking.title} key={index}>
            {parking.title}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default ParkingsInput;
