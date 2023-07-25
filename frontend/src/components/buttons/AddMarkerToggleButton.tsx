import React from 'react';

import { useAtom } from 'jotai';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import directionsAtom from '../../atoms/directions.atom';
import isAddParkingToggledAtom from '../../atoms/isAddParkingToggledAtom.atom';
import mainMapAtom from '../../atoms/mainMap.atom';
import newMarkerAddressAtom from '../../atoms/newMarkerAddressAtom.atom';
import parkingSpacesAtom from '../../atoms/parkingSpaces.atom';
import selectedDirectionIndexAtom from '../../atoms/selectedDirectionIndex.atom';
import selectedParkingIndexAtom from '../../atoms/selectedParkingIndex.atom';
import selectedParkingSpaceIndexAtom from '../../atoms/selectedParkingSpaceIndex.atom';
import { getCurrentUserRoute } from '../../constants/apiRoute';
import updateNewMarkerAddress from '../../functions/updateNewMarkerAddress';
import useFetch from '../../hooks/useFetch';
import CenteredItems from '../../styles/CenteredItems';
import LoadingSpinner from '../utils/LoadingSpinner';

const AddMarkerToggleButton = () => {
  const navigate = useNavigate();
  const [isAddParkingToggled, setIsAddParkingToggled] = useAtom(
    isAddParkingToggledAtom
  );
  const [direction, setDirection] = useAtom(directionsAtom);
  const [newMarkerAddress, setNewMarkerAddress] = useAtom(newMarkerAddressAtom);
  const [selectedDirectionIndex, setSelectedDirectionIndex] = useAtom(
    selectedDirectionIndexAtom
  );
  const [mainMap] = useAtom(mainMapAtom);
  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);
  const [selectedParkingIndex, setSelectedParkingIndex] = useAtom(
    selectedParkingIndexAtom
  );
  const [selectedParkingSpaceIndex, setSelectedParkingSpaceIndex] = useAtom(
    selectedParkingSpaceIndexAtom
  );

  const { data, error, isLoading } = useFetch(
    'currentUser',
    getCurrentUserRoute(),
    true,
    true
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    navigate('/404');
  }

  const handleAddressUpdate = () => {
    updateNewMarkerAddress(
      mainMap!.getCenter()!.lat(),
      mainMap!.getCenter()!.lng(),
      setNewMarkerAddress
    );
  };

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
      setNewMarkerAddress(null);
      setParkingSpaces([]);
      handleAddressUpdate();
    }

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

export default AddMarkerToggleButton;
