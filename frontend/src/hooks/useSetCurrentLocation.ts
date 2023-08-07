import { useEffect } from 'react';

import { useAtom } from 'jotai';

import currentLocationAtom from '../atoms/currentLocation.atom';
import mainMapAtom from '../atoms/mainMap.atom';
import getCurrentLocation from '../functions/getCurrentLocation';

const useSetCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);
  const [mainMap] = useAtom(mainMapAtom);

  useEffect(() => {
    if (mainMap !== null) {
      getCurrentLocation().then((value) => setCurrentLocation(value));
    }
  }, [mainMap]);
};

export default useSetCurrentLocation;
