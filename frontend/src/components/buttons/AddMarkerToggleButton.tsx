import React from 'react';

import { useAtom } from 'jotai';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import directionsAtom from '../../atoms/directions.atom';
import isAddMarkerToggledAtom from '../../atoms/isAddMarkerToggled.atom';
import mainMapAtom from '../../atoms/mainMap.atom';
import newMarkerAddressAtom from '../../atoms/newMarkerAddressAtom.atom';
import parkingSpacesAtom from '../../atoms/parkingSpaces.atom';
import selectedDirectionIndexAtom from '../../atoms/selectedDirectionIndex.atom';
import { getCurrentUserRoute } from '../../constants/apiRoute';
import updateNewMarkerAddress from '../../functions/updateNewMarkerAddress';
import useFetch from '../../hooks/useFetch';
import CenteredItems from '../../styles/CenteredItems';
import LoadingSpinner from '../utils/LoadingSpinner';

const AddMarkerToggleButton = () => {
  const navigate = useNavigate();
  const [isAddMarkerToggled, setIsAddMarkerToggled] = useAtom(
    isAddMarkerToggledAtom
  );
  const [direction, setDirection] = useAtom(directionsAtom);
  const [newMarkerAddress, setNewMarkerAddress] = useAtom(newMarkerAddressAtom);
  const [selectedDirectionIndex, setSelectedDirectionIndex] = useAtom(
    selectedDirectionIndexAtom
  );
  const [mainMap] = useAtom(mainMapAtom);
  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);

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

  const handleMapLock = () => {
    mainMap?.setOptions({
      draggable: isAddMarkerToggled,
      zoomControl: isAddMarkerToggled
    });
  };

  const handleAddressUpdate = () => {
    updateNewMarkerAddress(
      mainMap!.getCenter()!.lat(),
      mainMap!.getCenter()!.lng(),
      setNewMarkerAddress
    );
  };

  const handleClick = () => {
    if (!isAddMarkerToggled) {
      setDirection(null);
      setSelectedDirectionIndex(-1);
    } else {
      setNewMarkerAddress(null);
    }
    setIsAddMarkerToggled((prev) => !prev);

    if (mainMap !== null) {
      handleMapLock();
      handleAddressUpdate();
      setParkingSpaces([]);
    }
  };

  return (
    <CenteredItems role="button" className="justify-content-start">
      <Button
        variant={`outline-${isAddMarkerToggled ? 'warning' : 'info'}`}
        onClick={handleClick}
        className="p-1 px-2"
      >
        Toggle {isAddMarkerToggled ? 'off' : 'on'} add parking
      </Button>
    </CenteredItems>
  );
};

export default AddMarkerToggleButton;
