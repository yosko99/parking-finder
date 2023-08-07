import React from 'react';

import { Form } from 'react-bootstrap';

interface Props {
  address?: string;
}

const ParkingAddressInput = ({ address }: Props) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Address (move marker on map)</Form.Label>
      <Form.Control
        readOnly
        type="text"
        value={address || ''}
        name="address"
        placeholder="Rousse, Bulgaria"
      />
    </Form.Group>
  );
};

export default ParkingAddressInput;
