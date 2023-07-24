import React from 'react';

import { useAtom } from 'jotai';
import { Button } from 'react-bootstrap';

import getPolygonCoords from '../../../atoms/getPolygonCoords';
import mainMapAtom from '../../../atoms/mainMap.atom';
import parkingSpacesAtom from '../../../atoms/parkingSpaces.atom';

const AddSpaceButton = () => {
  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);
  const [map] = useAtom(mainMapAtom);

  const handleAddSpace = () => {
    setParkingSpaces((prev) => {
      return [
        ...prev,
        {
          paths: getPolygonCoords(
            map!.getCenter()!.lat(),
            map!.getCenter()!.lng(),
            0
          ),
          angle: 0
        }
      ];
    });
  };

  return (
    <Button className="w-100" variant="info" onClick={handleAddSpace}>
      Add space
    </Button>
  );
};

export default AddSpaceButton;
