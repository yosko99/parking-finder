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

import currentLocationAtom from '../atoms/currentLocation.atom';
import isMapLoadedAtom from '../atoms/isMapLoaded.atom';
import useSetCurrentLocation from '../hooks/useSetCurrentLocation';
import ICoordinate from '../interfaces/ICoordinate';
import LoadingPage from '../views/LoadingPage';

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places']
  });
  useSetCurrentLocation();

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const [dummyParkings, setDummyParkings] = useState<ICoordinate[]>([
    {
      lat: 43.43909428809759,
      lng: 26.179827615157926
    },
    {
      lat: 43.30807623768245,
      lng: 25.908259316818082
    },
    {
      lat: 43.08331696300573,
      lng: 26.275271340743863
    },
    {
      lat: 42.91318228257439,
      lng: 26.445251985166998
    }
  ]);

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [currentLocation] = useAtom(currentLocationAtom);
  const [isMapLoaded, setIsMapLoaded] = useAtom(isMapLoadedAtom);

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

        {dummyParkings?.map((parkingPosition, index: number) => (
          <MarkerF position={parkingPosition} key={index} />
        ))}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </>
  ) : (
    <LoadingPage />
  );
};

export default memo(Map);
