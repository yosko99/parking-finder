/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { BsFillSignNoParkingFill } from 'react-icons/bs';

import currentLocationAtom from '../../../atoms/currentLocation.atom';
import selectedDirectionIndexAtom from '../../../atoms/selectedDirectionIndex.atom';
import timeRangeAtom from '../../../atoms/timeRange.atom';
import useFetchParkingInformation from '../../../hooks/useFetchParkingInformation';
import ParkingInfo from '../../containers/ParkingInfo';

const ParkingsContainer = () => {
  const setSelectedDirectionIndex = useSetAtom(selectedDirectionIndexAtom);
  const [currentLocation] = useAtom(currentLocationAtom);
  const [timeRange] = useAtom(timeRangeAtom);

  const { parkings } = useFetchParkingInformation();

  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    setSelectedDirectionIndex(-1);
  }, [currentLocation, timeRange.startTime, timeRange.endTime]);

  return (
    <>
      {parkings.length === 0 ? (
        <div className="text-center display-5 mt-5 text-dark">
          <p>No parkings near you at this hour</p>
          <BsFillSignNoParkingFill size={60} />
        </div>
      ) : (
        parkings.map((parking, index) => (
          <ParkingInfo
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            index={index}
            key={index}
            parking={parking}
          />
        ))
      )}
    </>
  );
};

export default ParkingsContainer;
