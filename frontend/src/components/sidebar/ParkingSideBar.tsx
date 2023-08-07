/* eslint-disable multiline-ternary */
import React from 'react';

// @ts-ignore
import Fade from 'react-reveal/Fade';

import DatePicker from './elements/DatePicker';
import ParkingsContainer from './elements/ParkingsContainer';

const ParkingSideBar = () => {
  return (
    <Fade bottom>
      <div className="m-0 px-2" style={{ overflow: 'scroll', height: '95vh' }}>
        <DatePicker />
        <ParkingsContainer />
      </div>
    </Fade>
  );
};

export default ParkingSideBar;
