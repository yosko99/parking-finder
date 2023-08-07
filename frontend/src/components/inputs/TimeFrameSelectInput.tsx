import React from 'react';

import { Form } from 'react-bootstrap';

import TimeFrameType from '../../types/TimeFrameType';

interface Props {
  setSelectedTimeFrame: React.Dispatch<React.SetStateAction<TimeFrameType>>;
}

const TimeFrameSelectInput = ({ setSelectedTimeFrame }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as unknown as TimeFrameType;
    setSelectedTimeFrame(value);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Time frame</Form.Label>
      <Form.Select name="parking" onChange={handleChange}>
        <option value="DAY">Day</option>
        <option value="WEEK">Week</option>
        <option value="MONTH">Month</option>
        <option value="DAYS90">90 Days</option>
      </Form.Select>
    </Form.Group>
  );
};

export default TimeFrameSelectInput;
