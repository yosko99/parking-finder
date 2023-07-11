/* eslint-disable multiline-ternary */
/* eslint-disable no-undef */
import React, { memo, useCallback, useState } from 'react';

import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  MarkerF
} from '@react-google-maps/api';
import { useAtom } from 'jotai';

import closestParkingsAtom from '../atoms/closestParkings.atom';
import currentLocationAtom from '../atoms/currentLocation.atom';
import directionsAtom from '../atoms/directions.atom';
import isMapLoadedAtom from '../atoms/isMapLoaded.atom';
import useSetCurrentLocation from '../hooks/useSetCurrentLocation';
import LoadingPage from '../views/LoadingPage';

const libraries = ['places'];

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    // @ts-ignore
    libraries
  });
  useSetCurrentLocation();

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const [closestParkings] = useAtom(closestParkingsAtom);

  const [currentLocation] = useAtom(currentLocationAtom);
  const [isMapLoaded, setIsMapLoaded] = useAtom(isMapLoadedAtom);
  const [directions] = useAtom(directionsAtom);

  const handleOnLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds(currentLocation);
      map.fitBounds(bounds);
      map.setCenter(currentLocation);

      setMap(map);
      setIsMapLoaded(true);
    },
    [currentLocation]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        }}
        mapContainerStyle={{ width: '100%', height: '95vh' }}
        center={currentLocation}
        zoom={9}
        onLoad={handleOnLoad}
        onUnmount={onUnmount}
      >
        {currentLocation && <MarkerF position={currentLocation} />}

        {closestParkings?.map((parkingPosition, index: number) => (
          <MarkerF position={parkingPosition} key={index} />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </>
  ) : (
    <LoadingPage />
  );
};

export default memo(Map);
