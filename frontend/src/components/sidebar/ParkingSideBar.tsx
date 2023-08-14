/* eslint-disable multiline-ternary */
import React from 'react';

import DatePicker from './elements/DatePicker';
import ParkingsContainer from './elements/ParkingsContainer';

const ParkingSideBar = () => {
  return (
    <div className="m-0 px-2" style={{ overflow: 'scroll', height: '95vh' }}>
      <DatePicker />
      <ParkingsContainer />
    </div>
  );
};

export default ParkingSideBar;
