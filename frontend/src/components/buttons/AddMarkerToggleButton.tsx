import React from 'react';

import { useAtom } from 'jotai';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import directionsAtom from '../../atoms/directions.atom';
import isAddMarkerToggledAtom from '../../atoms/isAddMarkerToggled.atom';
import newMarkerAddressAtom from '../../atoms/newMarkerAddressAtom.atom';
import selectedDirectionIndexAtom from '../../atoms/selectedDirectionIndex.atom';
import { getCurrentUserRoute } from '../../constants/apiRoute';
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

  const handleClick = () => {
    if (!isAddMarkerToggled) {
      setDirection(null);
      setSelectedDirectionIndex(-1);
    } else {
      setNewMarkerAddress(null);
    }
    setIsAddMarkerToggled((isAddMarkerToggled) => !isAddMarkerToggled);
  };

  return (
    <CenteredItems role="button" className="justify-content-start">
      <Button
        variant={`outline-${isAddMarkerToggled ? 'warning' : 'info'}`}
        onClick={handleClick}
        className="p-1 px-2"
      >
        Toggle {isAddMarkerToggled ? 'off' : 'on'} add marker
      </Button>
    </CenteredItems>
  );
};

export default AddMarkerToggleButton;
