import React from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { Button } from 'react-bootstrap';

import directionsAtom from '../../atoms/directions.atom';
import isAddParkingToggledAtom from '../../atoms/isAddParkingToggledAtom.atom';
import mainMapAtom from '../../atoms/mainMap.atom';
import newMarkerAddressAtom from '../../atoms/newMarkerAddressAtom.atom';
import parkingSpacesAtom from '../../atoms/parkingSpaces.atom';
import selectedDirectionIndexAtom from '../../atoms/selectedDirectionIndex.atom';
import selectedParkingIndexAtom from '../../atoms/selectedParkingIndex.atom';
import selectedParkingSpaceIndexAtom from '../../atoms/selectedParkingSpaceIndex.atom';
import CenteredItems from '../../styles/CenteredItems';

const AddParkingToggleButton = () => {
  const [isAddParkingToggled, setIsAddParkingToggled] = useAtom(
    isAddParkingToggledAtom
  );
  const setDirection = useSetAtom(directionsAtom);
  const setNewMarkerAddress = useSetAtom(newMarkerAddressAtom);
  const setSelectedDirectionIndex = useSetAtom(selectedDirectionIndexAtom);
  const [mainMap] = useAtom(mainMapAtom);
  const setParkingSpaces = useSetAtom(parkingSpacesAtom);
  const setSelectedParkingIndex = useSetAtom(selectedParkingIndexAtom);
  const setSelectedParkingSpaceIndex = useSetAtom(
    selectedParkingSpaceIndexAtom
  );

  const handleClick = () => {
    if (!isAddParkingToggled) {
      setDirection(null);
      setSelectedDirectionIndex(-1);
      setSelectedParkingIndex(-1);
      setSelectedParkingSpaceIndex(-1);
      if (mainMap !== null) {
        mainMap.setOptions({ draggable: false, zoomControl: false });
      }
    } else {
      if (mainMap !== null) {
        mainMap.setOptions({ draggable: true, zoomControl: true });
      }
    }
    setParkingSpaces([]);
    setNewMarkerAddress(null);
    setIsAddParkingToggled((prev) => !prev);
  };

  return (
    <CenteredItems role="button" className="justify-content-start">
      <Button
        variant={`outline-${isAddParkingToggled ? 'warning' : 'info'}`}
        onClick={handleClick}
        className="p-1 px-2"
      >
        Toggle {isAddParkingToggled ? 'off' : 'on'} add parking
      </Button>
    </CenteredItems>
  );
};

export default AddParkingToggleButton;
