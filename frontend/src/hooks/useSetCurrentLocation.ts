import { useEffect } from 'react';

import { useAtom } from 'jotai';

import currentLocationAtom from '../atoms/currentLocation.atom';
import isMapLoadedAtom from '../atoms/isMapLoaded.atom';

const useSetCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);
  const [isMapLoaded] = useAtom(isMapLoadedAtom);

  useEffect(() => {
    if (isMapLoaded) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const location = { lat: latitude, lng: longitude };
            setCurrentLocation(location);
          },
          (error) => {
            console.error('Error getting current location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }, [isMapLoaded]);
};

export default useSetCurrentLocation;
