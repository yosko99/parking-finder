import React from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { Button } from 'react-bootstrap';

import mainMapAtom from '../../../atoms/mainMap.atom';
import parkingSpacesAtom from '../../../atoms/parkingSpaces.atom';
import selectedParkingSpaceIndexAtom from '../../../atoms/selectedParkingSpaceIndex.atom';
import getPolygonCoords from '../../../functions/getPolygonCoords';

const AddSpaceButton = () => {
  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);
  const setSelectedParkingSpaceIndex = useSetAtom(
    selectedParkingSpaceIndexAtom
  );
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
    setSelectedParkingSpaceIndex(parkingSpaces.length);
  };

  return (
    <Button className="w-100" variant="info" onClick={handleAddSpace}>
      Add space
    </Button>
  );
};

export default AddSpaceButton;
