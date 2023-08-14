/* eslint-disable multiline-ternary */
import React from 'react';

import DatePicker from './elements/DatePicker';
import ParkingsContainer from './elements/ParkingsContainer';
import CurrentLocationInput from '../inputs/CurrentLocationInput';

const ParkingSideBar = () => {
  return (
    <div className="m-0 px-4" style={{ overflow: 'scroll', height: '95vh' }}>
      {window.location.pathname === '/' && <CurrentLocationInput />}
      <DatePicker />
      <ParkingsContainer />
    </div>
  );
};

export default ParkingSideBar;
