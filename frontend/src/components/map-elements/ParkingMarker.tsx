/* eslint-disable multiline-ternary */
import React from 'react';

import { InfoWindowF } from '@react-google-maps/api';
import { useAtom } from 'jotai';

import isAddParkingToggledAtom from '../../atoms/isAddParkingToggledAtom.atom';
import selectedDirectionIndexAtom from '../../atoms/selectedDirectionIndex.atom';
import selectedParkingIndexAtom from '../../atoms/selectedParkingIndex.atom';
import calculateDirections from '../../functions/calculateDirections';
import ICoordinate from '../../interfaces/ICoordinate';
import IParking from '../../interfaces/IParking';
import ReserveParkingButton from '../buttons/parking/ReserveParkingButton';
import ParkingInfoModal from '../modals/ParkingInfoModal';

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
  const [isAddMarkerToggled] = useAtom(isAddParkingToggledAtom);
  const [selectedDirectionIndex, setSelectedDirectionIndex] = useAtom(
    selectedDirectionIndexAtom
  );
  const [selectedParkingIndex] = useAtom(selectedParkingIndexAtom);

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
      {selectedParkingIndex !== index && (
        <InfoWindowF position={{ lat: parking.lat!, lng: parking.lng! }}>
          <div>
            {index === selectedDirectionIndex ? (
              <>
                <div className="d-flex flex-column">
                  <span className="text-center fs-5 mb-2">{parking.title}</span>
                  <div className="d-flex">
                    <ParkingInfoModal parking={parking} />
                    <ReserveParkingButton index={index} parking={parking} />
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
      )}
    </div>
  );
};

export default ParkingMarker;
