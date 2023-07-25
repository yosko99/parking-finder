import React from 'react';

import { Polygon } from '@react-google-maps/api';
import { useAtom } from 'jotai';

import parkingSpacesAtom from '../../atoms/parkingSpaces.atom';
import selectedParkingIndexAtom from '../../atoms/selectedParkingIndex.atom';
import selectedParkingSpaceIndexAtom from '../../atoms/selectedParkingSpaceIndex.atom';
import getPolygonCoords from '../../functions/getPolygonCoords';
import IParkingSpace from '../../interfaces/IParkingSpace';

interface Props {
  index: number;
  parkingSpace: IParkingSpace;
}

const ParkingSpacePolygon = ({ index, parkingSpace }: Props) => {
  const [selectedParkingSpaceIndex, setSelectedParkingSpaceIndex] = useAtom(
    selectedParkingSpaceIndexAtom
  );
  const [selectedParkingIndex] = useAtom(selectedParkingIndexAtom);
  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);

  // eslint-disable-next-line no-undef
  const handleDragEnd = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng!.lat();
    const lng = e.latLng!.lng();

    const tempCoords = getPolygonCoords(
      lat,
      lng,
      parkingSpaces[selectedParkingSpaceIndex].angle
    );

    const updatedParkingSpaces = [...parkingSpaces];

    updatedParkingSpaces[selectedParkingSpaceIndex] = {
      paths: tempCoords,
      angle: parkingSpaces[selectedParkingSpaceIndex].angle
    };

    setParkingSpaces(updatedParkingSpaces);
  };

  const handleClick = (index: number) => {
    setSelectedParkingSpaceIndex(index);
  };

  const handleDragStart = (index: number) => {
    setSelectedParkingSpaceIndex(index);
  };

  return (
    <Polygon
      onDragEnd={handleDragEnd}
      key={index}
      onDragStart={() => handleDragStart(index)}
      path={parkingSpace.paths}
      onClick={() => handleClick(index)}
      options={{
        strokeColor: selectedParkingSpaceIndex === index ? 'red' : 'black'
      }}
      draggable={selectedParkingIndex === -1}
    />
  );
};

export default ParkingSpacePolygon;
