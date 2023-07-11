/* eslint-disable multiline-ternary */
import React, { useState } from 'react';

import { BsFillSignNoParkingFill } from 'react-icons/bs';

import ParkingContainer from '../containers/ParkingContainer';
import useFetchParkingInformation from '../hooks/useFetchParkingInformation';

const ParkingSideBar = () => {
  const { parkings } = useFetchParkingInformation();
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <div className="m-0 px-2" style={{ overflow: 'scroll', height: '95vh' }}>
      {parkings.length === 0 ? (
        <div className="text-center display-5 mt-5">
          <p>No parkings near you at this hour</p>
          <BsFillSignNoParkingFill size={60} />
        </div>
      ) : (
        parkings.map((parking, index) => (
          <ParkingContainer
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            index={index}
            key={index}
            parking={parking}
          />
        ))
      )}
    </div>
  );
};

export default ParkingSideBar;
