import React from 'react';

import { useAtomValue, useSetAtom } from 'jotai';
import { Button } from 'react-bootstrap';

import directionsAtom from '../../../atoms/directions.atom';
import isAddParkingToggledAtom from '../../../atoms/isAddParkingToggledAtom.atom';
import mainMapAtom from '../../../atoms/mainMap.atom';
import parkingForEditAtom from '../../../atoms/parkingForEdit.atom';
import parkingSpacesAtom from '../../../atoms/parkingSpaces.atom';
import selectedDirectionIndexAtom from '../../../atoms/selectedDirectionIndex.atom';
import selectedParkingIndexAtom from '../../../atoms/selectedParkingIndex.atom';
import emulateEscKeyPress from '../../../functions/emulateEscKeyPress';
import IParking from '../../../interfaces/IParking';

interface Props {
  parking: IParking;
}

const EditParkingButton = ({ parking }: Props) => {
  const mainMap = useAtomValue(mainMapAtom);
  const setSelectedParkingIndex = useSetAtom(selectedParkingIndexAtom);
  const setSelectedDirectionIndex = useSetAtom(selectedDirectionIndexAtom);
  const setParkingSpaces = useSetAtom(parkingSpacesAtom);
  const setParkingForEdit = useSetAtom(parkingForEditAtom);
  const setDirection = useSetAtom(directionsAtom);
  const setIsAddMarkerToggled = useSetAtom(isAddParkingToggledAtom);

  const handleClick = () => {
    if (mainMap !== null) {
      mainMap.setOptions({
        draggable: false,
        zoomControl: false,
        center: { lat: parking.lat!, lng: parking.lng! },
        zoom: parking.mapZoomLevel
      });
    }
    setSelectedDirectionIndex(-1);
    setSelectedParkingIndex(-1);
    setDirection(null);
    setParkingForEdit(parking);
    setParkingSpaces(parking.parkingSpaces);
    setIsAddMarkerToggled(true);

    emulateEscKeyPress();
  };

  return (
    <Button onClick={handleClick} className="w-100" variant="warning">
      Edit parking
    </Button>
  );
};

export default EditParkingButton;
