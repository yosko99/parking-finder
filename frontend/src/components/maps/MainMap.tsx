/* eslint-disable multiline-ternary */
/* eslint-disable no-undef */
import React, { memo, useCallback } from 'react';

import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer
} from '@react-google-maps/api';
import { useAtom } from 'jotai';

import currentLocationAtom from '../../atoms/currentLocation.atom';
import directionsAtom from '../../atoms/directions.atom';
import mainMapAtom from '../../atoms/mainMap.atom';
import parkingSpacesAtom from '../../atoms/parkingSpaces.atom';
import selectedParkingIndexAtom from '../../atoms/selectedParkingIndex.atom';
import useFetchParkingInformation from '../../hooks/useFetchParkingInformation';
import useSetCurrentLocation from '../../hooks/useSetCurrentLocation';
import mapStyle from '../../styles/googleMapStyle';
import LoadingPage from '../../views/LoadingPage';
import CurrentLocationMarker from '../map-elements/CurrentLocationMarker';
import ParkingMarker from '../map-elements/ParkingMarker';
import ParkingSpacePolygon from '../map-elements/ParkingSpacePolygon';

const libraries = ['places'];

const MainMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    // @ts-ignore
    libraries
  });
  useSetCurrentLocation();

  const [parkingSpaces] = useAtom(parkingSpacesAtom);
  const [map, setMap] = useAtom(mainMapAtom);
  const [currentLocation] = useAtom(currentLocationAtom);
  const [directions, setDirections] = useAtom(directionsAtom);
  const { parkings } = useFetchParkingInformation();
  const [selectedParkingIndex] = useAtom(selectedParkingIndexAtom);

  const handleOnLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds(currentLocation);
      map.fitBounds(bounds);

      setMap(map);
    },
    [currentLocation]
  );

  const onUnmount = useCallback(() => {
    setDirections(null);
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        options={{
          streetViewControl: false,
          mapTypeControl: true,
          panControl: false,
          fullscreenControl: false,
          styles: [mapStyle]
        }}
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
        {parkingSpaces.map((space, index) => (
          <ParkingSpacePolygon index={index} parkingSpace={space} key={index} />
        ))}

        {selectedParkingIndex !== -1 &&
          parkings[selectedParkingIndex]?.parkingSpaces.map((space, index) => (
            <ParkingSpacePolygon
              parkingSpace={space}
              index={index}
              key={index}
            />
          ))}
      </GoogleMap>
    </>
  ) : (
    <LoadingPage />
  );
};

export default memo(MainMap);
