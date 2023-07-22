/* eslint-disable multiline-ternary */
/* eslint-disable no-undef */
import React, { memo, useCallback, useState } from 'react';

import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer
} from '@react-google-maps/api';
import { useAtom } from 'jotai';
import { Button } from 'react-bootstrap';

import currentLocationAtom from '../../atoms/currentLocation.atom';
import directionsAtom from '../../atoms/directions.atom';
import getPolygonCoords from '../../atoms/getPolygonCoords';
import isAddMarkerToggledAtom from '../../atoms/isAddMarkerToggled.atom';
import isMapLoadedAtom from '../../atoms/isMapLoaded.atom';
import newMarkerAddressAtom from '../../atoms/newMarkerAddressAtom.atom';
import parkingSpacesAtom from '../../atoms/parkingSpaces.atom';
import rotateParkingSpace from '../../atoms/rotateCoordinates';
import selectedParkingIndexAtom from '../../atoms/selectedParkingIndex';
import timeRangeAtom from '../../atoms/timeRange.atom';
import updateNewMarkerAddress from '../../functions/updateNewMarkerAddress';
import useFetchParkingInformation from '../../hooks/useFetchParkingInformation';
import useSetCurrentLocation from '../../hooks/useSetCurrentLocation';
import mapStyle from '../../styles/googleMapStyle';
import LoadingPage from '../../views/LoadingPage';
import CurrentLocationMarker from '../map-elements/CurrentLocationMarker';
import NewMarker from '../map-elements/NewMarker';
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

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentLocation] = useAtom(currentLocationAtom);
  const [isMapLoaded, setIsMapLoaded] = useAtom(isMapLoadedAtom);
  const [directions, setDirections] = useAtom(directionsAtom);
  const [isAddMarkerToggled] = useAtom(isAddMarkerToggledAtom);
  const [timeRange] = useAtom(timeRangeAtom);
  const [newMarkerAddress, setNewMarkerAddress] = useAtom(newMarkerAddressAtom);
  const { parkings } = useFetchParkingInformation(
    timeRange.startTime,
    timeRange.endTime
  );

  const handleOnLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds(currentLocation);
      map.fitBounds(bounds);

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
  const [startLat, setStartLat] = useState(0);
  const [startLng, setStartLng] = useState(0);

  const [selectedParkingIndex] = useAtom(selectedParkingIndexAtom);

  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);

  const handleRotate = () => {
    const rotatedParking = rotateParkingSpace(
      parkingSpaces[selectedParkingIndex],
      true
    );

    const updatedParkingSpaces = parkingSpaces;
    updatedParkingSpaces[selectedParkingIndex] = rotatedParking;

    setParkingSpaces(() => {
      return [...updatedParkingSpaces];
    });
  };

  const handleAddSpace = () => {
    setParkingSpaces((prev) => {
      return [
        ...prev,
        { paths: getPolygonCoords(startLat, startLng, 0), angle: 0 }
      ];
    });
  };

  const [parkingBounds, setParkingBounds] =
    useState<google.maps.LatLngBounds>();

  const updateParkingBounds = () => {
    if (map !== null) {
      setStartLat(map!.getCenter()!.lat());
      setStartLng(map!.getCenter()!.lng());
      setParkingBounds(map?.getBounds());
    }
  };

  return isLoaded ? (
    <>
      <Button onClick={handleRotate}>Rotate</Button>
      <Button onClick={handleAddSpace}>Add space</Button>
      <GoogleMap
        onCenterChanged={updateParkingBounds}
        onZoomChanged={updateParkingBounds}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: false,
          styles: [mapStyle]
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
        {parkingSpaces.map((space, index) => (
          <ParkingSpacePolygon index={index} parkingSpace={space} key={index} />
        ))}
      </GoogleMap>
    </>
  ) : (
    <LoadingPage />
  );
};

export default memo(MainMap);
