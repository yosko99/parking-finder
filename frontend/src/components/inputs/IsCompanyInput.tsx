import React from 'react';

import { Form } from 'react-bootstrap';

interface Props {
  isChecked: boolean;
}

const IsCompanyInput = ({ isChecked }: Props) => {
  return (
    <Form.Group className="mb-3 d-flex justify-content-center">
      <Form.Check
        type="switch"
        value={isChecked ? 'off' : 'on'}
        name="isCompany"
        className="fs-4"
        label="Company?"
      />
    </Form.Group>
  );
};

export default IsCompanyInput;
