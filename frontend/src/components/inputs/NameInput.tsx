import React from 'react';

import { Form } from 'react-bootstrap';

const NameInput = () => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Name</Form.Label>
      <Form.Control
        type="text"
        className="border"
        required
        name="name"
        placeholder="Name"
        minLength={3}
      />
    </Form.Group>
  );
};

export default NameInput;
