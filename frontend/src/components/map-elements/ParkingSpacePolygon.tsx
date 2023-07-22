import React from 'react';

import { Polygon } from '@react-google-maps/api';
import { useAtom } from 'jotai';

import getPolygonCoords from '../../atoms/getPolygonCoords';
import parkingSpacesAtom from '../../atoms/parkingSpaces.atom';
import selectedParkingIndexAtom from '../../atoms/selectedParkingIndex';
import IParkingSpace from '../../interfaces/IParkingSpace';

interface Props {
  index: number;
  parkingSpace: IParkingSpace;
}

const ParkingSpacePolygon = ({ index, parkingSpace }: Props) => {
  const [selectedParkingIndex, setSelectedParkingIndex] = useAtom(
    selectedParkingIndexAtom
  );
  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);

  // eslint-disable-next-line no-undef
  const handleDragEnd = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng!.lat();
    const lng = e.latLng!.lng();

    const tempCoords = getPolygonCoords(
      lat,
      lng,
      parkingSpaces[selectedParkingIndex].angle
    );

    const updatedParkingSpaces = [...parkingSpaces];

    updatedParkingSpaces[selectedParkingIndex] = {
      paths: tempCoords,
      angle: parkingSpaces[selectedParkingIndex].angle
    };

    setParkingSpaces(updatedParkingSpaces);
  };

  const handleClick = (index: number) => {
    setSelectedParkingIndex(index);
  };

  const handleDragStart = (index: number) => {
    setSelectedParkingIndex(index);
  };

  return (
    <Polygon
      onDragEnd={handleDragEnd}
      key={index}
      onDragStart={() => handleDragStart(index)}
      path={parkingSpace.paths}
      onClick={() => handleClick(index)}
      options={{
        strokeColor: selectedParkingIndex === index ? 'red' : 'black'
      }}
      draggable
    />
  );
};

export default ParkingSpacePolygon;
