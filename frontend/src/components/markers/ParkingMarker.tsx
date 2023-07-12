import React from 'react';

import { InfoWindowF } from '@react-google-maps/api';
import { useAtom } from 'jotai';

import isAddMarkerToggledAtom from '../../atoms/isAddMarkerToggled.atom';
import calculateDirections from '../../functions/calculateDirections';
import ICoordinate from '../../interfaces/ICoordinate';
import IParking from '../../interfaces/IParking';

interface Props {
  index: number;
  currentLocation: ICoordinate;
  parking: IParking;
  setDirections: React.Dispatch<React.SetStateAction<any>>;
  setSelectedDirectionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ParkingMarker = ({
  currentLocation,
  index,
  parking,
  setDirections,
  setSelectedDirectionIndex
}: Props) => {
  const [isAddMarkerToggled] = useAtom(isAddMarkerToggledAtom);

  const handleClick = () => {
    if (!isAddMarkerToggled) {
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
    <div onClick={handleClick} key={index} role="button">
      <InfoWindowF position={parking.coordinates} key={index}>
        <div>{parking.hourlyPrice.toString()}$</div>
      </InfoWindowF>
    </div>
  );
};

export default ParkingMarker;
