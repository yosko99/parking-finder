import React from 'react';

import { useAtom } from 'jotai';
import { Button } from 'react-bootstrap';

import parkingSpacesAtom from '../../../atoms/parkingSpaces.atom';
import selectedParkingIndexAtom from '../../../atoms/selectedParkingIndex';

const DeleteSpaceButton = () => {
  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);
  const [selectedParkingIndex] = useAtom(selectedParkingIndexAtom);

  const handleDeleteSpace = () => {
    const updatedParkingSpaces = parkingSpaces;
    updatedParkingSpaces.splice(selectedParkingIndex, 1);

    setParkingSpaces([...updatedParkingSpaces]);
  };

  return (
    <>
      {parkingSpaces.length !== 0 && (
        <Button className="w-100" variant="danger" onClick={handleDeleteSpace}>
          Delete space
        </Button>
      )}
    </>
  );
};

export default DeleteSpaceButton;
