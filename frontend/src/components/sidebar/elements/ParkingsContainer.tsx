/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';

import { useAtom } from 'jotai';
import { BsFillSignNoParkingFill } from 'react-icons/bs';

import currentLocationAtom from '../../../atoms/currentLocation.atom';
import selectedDirectionIndexAtom from '../../../atoms/selectedDirectionIndex.atom';
import ParkingContainer from '../../../containers/ParkingContainer';
import useFetchParkingInformation from '../../../hooks/useFetchParkingInformation';

const ParkingsContainer = () => {
  const [selectedDirectionIndex, setSelectedDirectionIndex] = useAtom(
    selectedDirectionIndexAtom
  );
  const [currentLocation] = useAtom(currentLocationAtom);

  const { parkings } = useFetchParkingInformation(
    '2023-07-13T07:04:26.572Z',
    '2023-07-13T07:04:26.572Z'
  );
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    setSelectedDirectionIndex(-1);
  }, [currentLocation]);

  return (
    <>
      {parkings.length === 0 ? (
        <div className="text-center display-5 mt-5 text-dark">
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
    </>
  );
};

export default ParkingsContainer;
