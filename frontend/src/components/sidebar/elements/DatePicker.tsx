import React from 'react';

import { useAtom } from 'jotai';
import { Form } from 'react-bootstrap';

import timeRangeAtom from '../../../atoms/timeRange.atom';

const DatePicker = () => {
  const [timeRange, setTimeRange] = useAtom(timeRangeAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeRange((time) => {
      return {
        ...time,
        [e.target.name]: e.target.value
      };
    });
  };

  return (
    <div className="d-flex flex-column px-2 pt-2 text-dark">
      <Form.Group className="">
        <Form.Label>Start date</Form.Label>
        <Form.Control
          onChange={handleChange}
          type="datetime-local"
          defaultValue={timeRange.startTime}
          className="border"
          name="startTime"
        />
      </Form.Group>
      <Form.Group className="">
        <Form.Label>End date</Form.Label>
        <Form.Control
          min={timeRange.startTime}
          type="datetime-local"
          defaultValue={timeRange.endTime}
          onChange={handleChange}
          className="border"
          name="endTime"
        />
      </Form.Group>
    </div>
  );
};

export default DatePicker;
