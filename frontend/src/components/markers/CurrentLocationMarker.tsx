import React from 'react';

import { MarkerF } from '@react-google-maps/api';

import ICoordinate from '../../interfaces/ICoordinate';

interface Props {
  currentLocation: ICoordinate;
}

const CurrentLocationMarker = ({ currentLocation }: Props) => {
  return (
    <MarkerF
      icon={{
        url: 'https://cdn-icons-png.flaticon.com/512/5193/5193688.png',
        scaledSize: new window.google.maps.Size(40, 40),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(20, 20)
      }}
      position={currentLocation}
    />
  );
};

export default CurrentLocationMarker;
