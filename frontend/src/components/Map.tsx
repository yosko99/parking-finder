/* eslint-disable multiline-ternary */
/* eslint-disable no-undef */
import React, { memo, useCallback, useState } from 'react';

import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer
} from '@react-google-maps/api';
import { useAtom } from 'jotai';

import CurrentLocationMarker from './markers/CurrentLocationMarker';
import NewMarker from './markers/NewMarker';
import ParkingMarker from './markers/ParkingMarker';
import currentLocationAtom from '../atoms/currentLocation.atom';
import directionsAtom from '../atoms/directions.atom';
import isAddMarkerToggledAtom from '../atoms/isAddMarkerToggled.atom';
import isMapLoadedAtom from '../atoms/isMapLoaded.atom';
import newMarkerAddressAtom from '../atoms/newMarkerAddressAtom.atom';
import updateNewMarkerAddress from '../functions/updateNewMarkerAddress';
import useFetchParkingInformation from '../hooks/useFetchParkingInformation';
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
  const [currentLocation] = useAtom(currentLocationAtom);
  const [isMapLoaded, setIsMapLoaded] = useAtom(isMapLoadedAtom);
  const [directions, setDirections] = useAtom(directionsAtom);
  const [isAddMarkerToggled] = useAtom(isAddMarkerToggledAtom);
  const [newMarkerAddress, setNewMarkerAddress] = useAtom(newMarkerAddressAtom);
  const { parkings } = useFetchParkingInformation(
    '2023-07-13T07:04:26.572Z',
    '2023-07-13T07:04:26.572Z'
  );

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
    setDirections(null);
    setMap(null);
  }, []);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (isAddMarkerToggled) {
      updateNewMarkerAddress(
        e.latLng!.lat(),
        e.latLng!.lng(),
        setNewMarkerAddress
      );
    }
  };

  return isLoaded ? (
    <>
      <GoogleMap
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels.icon',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            }
          ]
        }}
        onClick={handleMapClick}
        mapContainerStyle={{ width: '100%', height: '95vh' }}
        center={currentLocation}
        zoom={9}
        onLoad={handleOnLoad}
        onUnmount={onUnmount}
      >
        {currentLocation && (
          <CurrentLocationMarker currentLocation={currentLocation} />
        )}
        {parkings?.map((parking, index: number) => (
          <ParkingMarker
            currentLocation={currentLocation}
            index={index}
            parking={parking}
            setDirections={setDirections}
            key={index}
          />
        ))}
        {directions && (
          <DirectionsRenderer
            options={{ suppressMarkers: true }}
            directions={directions}
          />
        )}
        {newMarkerAddress !== null && (
          <NewMarker position={newMarkerAddress.coords} />
        )}
      </GoogleMap>
    </>
  ) : (
    <LoadingPage />
  );
};

export default memo(Map);
