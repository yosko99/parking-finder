import React from 'react';

import { MarkerF } from '@react-google-maps/api';
import { useAtomValue, useSetAtom } from 'jotai';

import isAddParkingToggledAtom from '../../atoms/isAddParkingToggledAtom.atom';
import newMarkerAddressAtom from '../../atoms/newMarkerAddressAtom.atom';
import updateNewMarkerAddress from '../../functions/updateNewMarkerAddress';
import ICoordinate from '../../interfaces/ICoordinate';

interface Props {
  position: ICoordinate;
}

const NewMarker = ({ position }: Props) => {
  const isAddParkingToggled = useAtomValue(isAddParkingToggledAtom);
  const setNewMarkerAddress = useSetAtom(newMarkerAddressAtom);

  const handleDragEnd = (lat: number, lng: number) => {
    if (isAddParkingToggled) {
      updateNewMarkerAddress(lat, lng, setNewMarkerAddress);
    }
  };

  return (
    <MarkerF
      onDragEnd={(e) => handleDragEnd(e.latLng!.lat(), e.latLng!.lng())}
      position={position}
      draggable={isAddParkingToggled}
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
