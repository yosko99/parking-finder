import React from 'react';

import { useAtom } from 'jotai';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import isAddMarkerToggledAtom from '../../atoms/isAddMarkerToggled.atom';
import { getCurrentUserRoute } from '../../constants/apiRoute';
import useFetch from '../../hooks/useFetch';
import CenteredItems from '../../styles/CenteredItems';
import LoadingSpinner from '../utils/LoadingSpinner';

const AddMarkerToggleButton = () => {
  const navigate = useNavigate();
  const [isAddMarkerToggled, setIsAddMarkerToggled] = useAtom(
    isAddMarkerToggledAtom
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
    setIsAddMarkerToggled((isAddMarkerToggled) => !isAddMarkerToggled);
  };

  return (
    <CenteredItems role="button" className="justify-content-start">
      <Button
        variant={`outline-${isAddMarkerToggled ? 'info' : 'warning'}`}
        onClick={handleClick}
        className="p-1 px-2"
      >
        Toggle {isAddMarkerToggled ? 'on' : 'off'} add marker
      </Button>
    </CenteredItems>
  );
};

export default AddMarkerToggleButton;
