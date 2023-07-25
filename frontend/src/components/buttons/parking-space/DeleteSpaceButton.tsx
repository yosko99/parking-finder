import React from 'react';

import { useAtom } from 'jotai';
import { Button } from 'react-bootstrap';

import parkingSpacesAtom from '../../../atoms/parkingSpaces.atom';
import selectedParkingSpaceIndexAtom from '../../../atoms/selectedParkingSpaceIndex.atom';

const DeleteSpaceButton = () => {
  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);
  const [selectedParkingSpaceIndex] = useAtom(selectedParkingSpaceIndexAtom);

  const handleDeleteSpace = () => {
    const updatedParkingSpaces = parkingSpaces;
    updatedParkingSpaces.splice(selectedParkingSpaceIndex, 1);

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
