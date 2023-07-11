import { useEffect } from 'react';

import { useAtom } from 'jotai';

import currentLocationAtom from '../atoms/currentLocation.atom';
import isMapLoadedAtom from '../atoms/isMapLoaded.atom';
import getCurrentLocation from '../functions/getCurrentLocation';

const useSetCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);
  const [isMapLoaded] = useAtom(isMapLoadedAtom);

  useEffect(() => {
    if (isMapLoaded) {
      getCurrentLocation().then((value) => setCurrentLocation(value));
    }
  }, [isMapLoaded]);
};

export default useSetCurrentLocation;
