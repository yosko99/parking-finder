/* eslint-disable multiline-ternary */
/* eslint-disable no-undef */
import React, { useCallback, useState } from 'react';

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import ICoordinate from '../../interfaces/ICoordinate';
import mapStyle from '../../styles/googleMapStyle';
import NewMarker from '../markers/NewMarker';
import LoadingSpinner from '../utils/LoadingSpinner';

const libraries = ['places'];

interface Props {
  coordinates: ICoordinate;
}

const ReserveParkingMap = ({ coordinates }: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    // @ts-ignore
    libraries
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const handleOnLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(coordinates);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  return isLoaded ? (
    <GoogleMap
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        styles: [mapStyle]
      }}
      mapContainerStyle={{ width: '100%', height: '25vh' }}
      center={coordinates}
      zoom={15}
      onLoad={handleOnLoad}
      onUnmount={onUnmount}
    >
      <NewMarker position={coordinates} />
    </GoogleMap>
  ) : (
    <LoadingSpinner />
  );
};

export default ReserveParkingMap;
