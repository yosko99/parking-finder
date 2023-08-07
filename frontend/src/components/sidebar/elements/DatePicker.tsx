import React, { useState } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { Alert, Form } from 'react-bootstrap';

import directionsAtom from '../../../atoms/directions.atom';
import timeRangeAtom from '../../../atoms/timeRange.atom';
import getFormattedCurrentDate from '../../../functions/getFormattedCurrentDate';
import useFetchParkingInformation from '../../../hooks/useFetchParkingInformation';
import ITimeRange from '../../../interfaces/ITameRange';

const DatePicker = () => {
  const setDirections = useSetAtom(directionsAtom);
  const [alert, setAlert] = useState<React.ReactNode>(null);
  const [timeRange, setTimeRange] = useAtom(timeRangeAtom);

  const { getParkingInfo } = useFetchParkingInformation();

  const setTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempTimeRange: ITimeRange = timeRange;
    setTimeRange((time) => {
      if (e.target.name === 'startTime') {
        tempTimeRange = {
          endTime: e.target.value,
          [e.target.name]: e.target.value
        };
        return tempTimeRange;
      } else {
        tempTimeRange = {
          ...time,
          [e.target.name]: e.target.value
        };
        return tempTimeRange;
      }
    });
    getParkingInfo({ timeRange: tempTimeRange });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.name === 'endTime' &&
      new Date(e.target.value) < new Date(timeRange.startTime)
    ) {
      setAlert(
        <Alert variant="warning" className="m-0 mt-3">
          Please select valid date
        </Alert>
      );
    } else if (e.target.value === '') {
      setAlert(
        <Alert variant="warning" className="m-0 mt-3">
          Please do not clear the time frame
        </Alert>
      );
    } else {
      setTime(e);
      setDirections(null);
      setAlert(null);
    }
  };

  return (
    <div className="d-flex flex-column px-2 pt-2 text-dark">
      <Form.Group className="mb-3">
        <Form.Label>Start date</Form.Label>
        <Form.Control
          onChange={handleChange}
          type="datetime-local"
          min={getFormattedCurrentDate()}
          value={timeRange.startTime}
          className="border"
          name="startTime"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>End date</Form.Label>
        <Form.Control
          required
          min={timeRange.startTime}
          type="datetime-local"
          value={timeRange.endTime}
          onChange={handleChange}
          className="border"
          name="endTime"
        />
      </Form.Group>
      {alert}
    </div>
  );
};

export default DatePicker;
