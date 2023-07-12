/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';

import { useAtom } from 'jotai';
import { BsFillSignNoParkingFill } from 'react-icons/bs';

import currentLocationAtom from '../atoms/currentLocation.atom';
import selectedDirectionIndexAtom from '../atoms/selectedDirectionIndex.atom';
import ParkingContainer from '../containers/ParkingContainer';
import useFetchParkingInformation from '../hooks/useFetchParkingInformation';

const SideBar = () => {
  const [selectedDirectionIndex, setSelectedDirectionIndex] = useAtom(
    selectedDirectionIndexAtom
  );
  const [currentLocation] = useAtom(currentLocationAtom);

  const { parkings } = useFetchParkingInformation();
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    setSelectedDirectionIndex(-1);
  }, [currentLocation]);

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

export default SideBar;