/* eslint-disable multiline-ternary */
import React from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { AiFillCar } from 'react-icons/ai';

import currentLocationAtom from '../../atoms/currentLocation.atom';
import directionsAtom from '../../atoms/directions.atom';
import selectedDirectionIndexAtom from '../../atoms/selectedDirectionIndex.atom';
import calculateDirections from '../../functions/calculateDirections';
import IParking from '../../interfaces/IParking';

interface Props {
  setHoveredIndex: React.Dispatch<React.SetStateAction<number>>;
  hoveredIndex: number;
  index: number;
  parking: IParking;
}

const ParkingInfo = ({
  hoveredIndex,
  index,
  parking,
  setHoveredIndex
}: Props) => {
  const setDirections = useSetAtom(directionsAtom);
  const [currentLocation] = useAtom(currentLocationAtom);
  const [selectedDirectionIndex, setSelectedDirectionIndex] = useAtom(
    selectedDirectionIndexAtom
  );

  const handleClick = () => {
    if (selectedDirectionIndex === index) {
      setDirections(null);
      setSelectedDirectionIndex(-1);
    } else {
      calculateDirections(
        currentLocation,
        parking.address,
        setDirections,
        setSelectedDirectionIndex,
        index
      );
    }
  };

  return (
    <div
      key={index}
      onClick={handleClick}
      role="button"
      onMouseOver={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(-1)}
      className={`shadow ${
        selectedDirectionIndex === index
          ? 'bg-info text-white'
          : hoveredIndex === index
          ? 'bg-primary text-white'
          : 'bg-light text-dark'
      } rounded p-3 my-3 mx-2`}
    >
      <p className="m-0 mb-1">
        {parking.title} <span>({parking.distance})</span>
      </p>
      {parking.reservable ? (
        <p className="text-success">RESERVABLE</p>
      ) : (
        <p className="text-danger">FULL</p>
      )}
      <div className="d-flex justify-content-between">
        <div>
          <p className="m-0">{parking.hourlyPrice}$</p>
          <p className="m-0">parking fee</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className="m-0">
            <AiFillCar size={35} /> {parking.duration}
          </p>
          <p className="m-0">to destination</p>
        </div>
      </div>
    </div>
  );
};

export default ParkingInfo;
