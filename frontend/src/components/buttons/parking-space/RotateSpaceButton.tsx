import React from 'react';

import { useAtom } from 'jotai';
import { Button } from 'react-bootstrap';

import parkingSpacesAtom from '../../../atoms/parkingSpaces.atom';
import selectedParkingSpaceAtom from '../../../atoms/selectedParkingSpaceIndex.atom';
import rotateParkingSpace from '../../../functions/rotateCoordinates';

interface Props {
  isClockwise: boolean;
}

const RotateSpaceButton = ({ isClockwise }: Props) => {
  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);
  const [selectedParkingSpaceIndex] = useAtom(selectedParkingSpaceAtom);

  const handleRotate = () => {
    const parkingIndex =
      parkingSpaces.length !== 0 && selectedParkingSpaceIndex === -1
        ? 0
        : selectedParkingSpaceIndex;

    const rotatedParking = rotateParkingSpace(
      parkingSpaces[parkingIndex],
      !isClockwise
    );

    const updatedParkingSpaces = parkingSpaces;
    updatedParkingSpaces[parkingIndex] = rotatedParking;

    setParkingSpaces(() => {
      return [...updatedParkingSpaces];
    });
  };

  return (
    <>
      {parkingSpaces.length !== 0 && (
        <>
          <Button
            className="w-100"
            variant="outline-primary"
            onClick={handleRotate}
          >
            Rotate {isClockwise ? 'right' : 'left'}
          </Button>
        </>
      )}
    </>
  );
};

export default RotateSpaceButton;
