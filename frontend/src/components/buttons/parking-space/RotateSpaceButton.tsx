import React from 'react';

import { useAtom } from 'jotai';
import { Button } from 'react-bootstrap';

import parkingSpacesAtom from '../../../atoms/parkingSpaces.atom';
import rotateParkingSpace from '../../../atoms/rotateCoordinates';
import selectedParkingIndexAtom from '../../../atoms/selectedParkingIndex';

interface Props {
  isClockwise: boolean;
}

const RotateSpaceButton = ({ isClockwise }: Props) => {
  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);
  const [selectedParkingIndex] = useAtom(selectedParkingIndexAtom);

  const handleRotate = () => {
    const parkingIndex =
      parkingSpaces.length !== 0 && selectedParkingIndex === -1
        ? 0
        : selectedParkingIndex;

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
