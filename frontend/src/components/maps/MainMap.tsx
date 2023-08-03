/* eslint-disable multiline-ternary */
/* eslint-disable no-undef */
import React, { memo, useCallback, useEffect, useState } from 'react';

import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer
} from '@react-google-maps/api';
import { useAtom, useAtomValue } from 'jotai';

import currentLocationAtom from '../../atoms/currentLocation.atom';
import directionsAtom from '../../atoms/directions.atom';
import mainMapAtom from '../../atoms/mainMap.atom';
import newMarkerAddressAtom from '../../atoms/newMarkerAddressAtom.atom';
import parkingSpacesAtom from '../../atoms/parkingSpaces.atom';
import selectedParkingIndexAtom from '../../atoms/selectedParkingIndex.atom';
import mapOptions from '../../data/mapOptions';
import useFetchParkingInformation from '../../hooks/useFetchParkingInformation';
import useResetParkingIndexes from '../../hooks/useResetParkingIndexes';
import useSetCurrentLocation from '../../hooks/useSetCurrentLocation';
import LoadingPage from '../../views/LoadingPage';
import CurrentLocationMarker from '../map-elements/CurrentLocationMarker';
import NewMarker from '../map-elements/NewMarker';
import ParkingMarker from '../map-elements/ParkingMarker';
import ParkingSpacePolygon from '../map-elements/ParkingSpacePolygon';

const libraries = ['places'];

const MainMap = () => {
  useResetParkingIndexes();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    // @ts-ignore
    libraries
  });
  useSetCurrentLocation();
  const [mapHeight, setMapHeight] = useState(
    window.innerWidth < 1000 ? '50vh' : '95vh'
  );

  const [parkingSpaces] = useAtom(parkingSpacesAtom);
  const [map, setMap] = useAtom(mainMapAtom);
  const newMarkerAddress = useAtomValue(newMarkerAddressAtom);

  const [currentLocation] = useAtom(currentLocationAtom);
  const [directions, setDirections] = useAtom(directionsAtom);
  const { parkings, getParkingInfo } = useFetchParkingInformation();
  const [selectedParkingIndex] = useAtom(selectedParkingIndexAtom);

  const handleOnLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds(currentLocation);
      map.fitBounds(bounds);

      setMap(map);
    },
    [currentLocation]
  );

  const updateMapHeight = () => {
    setMapHeight(window.innerWidth < 1000 ? '50vh' : '95vh');
  };

  useEffect(() => {
    window.addEventListener('resize', updateMapHeight);
    getParkingInfo();
  }, []);

  const onUnmount = useCallback(() => {
    setDirections(null);
    setMap(null);
    window.removeEventListener('resize', updateMapHeight);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        options={mapOptions}
        mapContainerStyle={{
          width: '100%',
          height: mapHeight
        }}
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
        {newMarkerAddress !== null && (
          <NewMarker position={newMarkerAddress.coords} />
        )}
      </GoogleMap>
    </>
  ) : (
    <LoadingPage />
  );
};

export default memo(MainMap);
