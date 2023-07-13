/* eslint-disable multiline-ternary */
import React from 'react';

import { InfoWindowF } from '@react-google-maps/api';
import { useAtom } from 'jotai';
import { Button } from 'react-bootstrap';

import isAddMarkerToggledAtom from '../../atoms/isAddMarkerToggled.atom';
import selectedDirectionIndexAtom from '../../atoms/selectedDirectionIndex.atom';
import calculateDirections from '../../functions/calculateDirections';
import ICoordinate from '../../interfaces/ICoordinate';
import IParking from '../../interfaces/IParking';

interface Props {
  index: number;
  currentLocation: ICoordinate;
  parking: IParking;
  setDirections: React.Dispatch<React.SetStateAction<any>>;
}

const ParkingMarker = ({
  currentLocation,
  index,
  parking,
  setDirections
}: Props) => {
  const [isAddMarkerToggled] = useAtom(isAddMarkerToggledAtom);
  const [selectedDirectionIndex, setSelectedDirectionIndex] = useAtom(
    selectedDirectionIndexAtom
  );

  const handleChangeDirection = () => {
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
    <div role="button">
      <InfoWindowF position={parking.coordinates} options={{}}>
        <div>
          {index === selectedDirectionIndex ? (
            <>
              <div className="d-flex flex-column">
                <span className="text-center fs-5 mb-2">{parking.title}</span>
                <div>
                  <Button variant="info">Info</Button>
                  <Button variant="success">Reserve</Button>
                </div>
              </div>
            </>
          ) : (
            <span role="button" onClick={handleChangeDirection}>
              {parking.hourlyPrice.toString()}$
            </span>
          )}
        </div>
      </InfoWindowF>
    </div>
  );
};

export default ParkingMarker;
