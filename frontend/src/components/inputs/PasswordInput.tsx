import React from 'react';

import { Form } from 'react-bootstrap';

const PasswordInput = () => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        className="border"
        required
        name="password"
        placeholder="Password"
        minLength={8}
      />
    </Form.Group>
  );
};

export default PasswordInput;
