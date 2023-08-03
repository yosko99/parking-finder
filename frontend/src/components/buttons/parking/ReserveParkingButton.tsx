import React from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import directionsAtom from '../../../atoms/directions.atom';
import mainMapAtom from '../../../atoms/mainMap.atom';
import parkingsAtom from '../../../atoms/parkings.atom';
import selectedDirectionIndexAtom from '../../../atoms/selectedDirectionIndex.atom';
import selectedParkingIndexAtom from '../../../atoms/selectedParkingIndex.atom';
import IParking from '../../../interfaces/IParking';

interface Props {
  parking: IParking;
  className?: string;
  index: number;
}

const ReserveParkingButton = ({ parking, className, index }: Props) => {
  const [mainMap] = useAtom(mainMapAtom);
  const [selectedParkingIndex, setSelectedParkingIndex] = useAtom(
    selectedParkingIndexAtom
  );
  const setSelectedDirectionIndex = useSetAtom(selectedDirectionIndexAtom);
  const setDirection = useSetAtom(directionsAtom);

  const [parkings] = useAtom(parkingsAtom);
  const navigate = useNavigate();

  const handleClick = () => {
    if (mainMap !== null && index !== -1) {
      setDirection(null);
      setSelectedDirectionIndex(-1);
      mainMap.setZoom(parking.mapZoomLevel);
      mainMap.setCenter({ lat: parking.lat!, lng: parking.lng! });
      mainMap.setOptions({ zoomControl: false, draggable: false });
      setSelectedParkingIndex(index);
    } else {
      navigate('/reserve-parking', {
        state: { parking: parkings[selectedParkingIndex] }
      });
    }
  };

  return (
    <Button className={className} onClick={handleClick} variant="success">
      Reserve
    </Button>
  );
};

export default ReserveParkingButton;
