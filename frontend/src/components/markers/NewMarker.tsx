import React from 'react';

import { MarkerF } from '@react-google-maps/api';

import ICoordinate from '../../interfaces/ICoordinate';
interface Props {
  position: ICoordinate;
}

const NewMarker = ({ position }: Props) => {
  return (
    <MarkerF
      position={position}
      icon={{
        url: 'https://cdn-icons-png.flaticon.com/512/4842/4842406.png',
        scaledSize: new window.google.maps.Size(40, 40),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(20, 20)
      }}
    />
  );
};

export default NewMarker;
