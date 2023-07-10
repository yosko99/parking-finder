import { useEffect } from 'react';

import { useAtom } from 'jotai';

import currentLocationAtom from '../atoms/currentLocation.atom';

const useSetCurrentLocation = (isLoaded: boolean) => {
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);

  useEffect(() => {
    if (isLoaded) {
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
  }, [isLoaded]);
};

export default useSetCurrentLocation;
