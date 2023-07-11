import React from 'react';

import { Form } from 'react-bootstrap';

const IsCompanyInput = () => {
  return (
    <Form.Group className="mb-3 d-flex justify-content-center">
      <Form.Check
        type="switch"
        value={'off'}
        name="isCompany"
        className="fs-4"
        label="Company?"
      />
    </Form.Group>
  );
};

export default IsCompanyInput;
