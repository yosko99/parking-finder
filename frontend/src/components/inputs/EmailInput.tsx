import React from 'react';

import { Form } from 'react-bootstrap';

const EmailInput = () => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type="email"
        required
        name="email"
        className="border"
        placeholder="Enter email"
      />
      <Form.Text className="text-muted">
        We will never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  );
};

export default EmailInput;
