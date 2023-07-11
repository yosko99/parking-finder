import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import closestParkingsAtom from '../atoms/closestParkings.atom';
import currentLocationAtom from '../atoms/currentLocation.atom';
import isMapLoadedAtom from '../atoms/isMapLoaded.atom';
import IParking from '../interfaces/IParking';

const useFetchParkingInformation = () => {
  const [currentLocation] = useAtom(currentLocationAtom);
  const [closestParkings] = useAtom(closestParkingsAtom);
  const [isMapLoaded] = useAtom(isMapLoadedAtom);

  const [parkings, setParkings] = useState<IParking[]>([]);

  useEffect(() => {
    if (isMapLoaded) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [currentLocation],
          destinations: closestParkings,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING
        },
        async (response, status) => {
          if (status === 'OK') {
            const tempParking: IParking[] = [];
            const responseElements = response?.rows[0].elements;

            responseElements?.forEach((element, index) => {
              if (element.status === 'OK') {
                tempParking.push({
                  address: response?.destinationAddresses[index] || '',
                  duration: element.duration.text,
                  distance: element.distance.text,
                  hourlyPrice: Math.floor(Math.random() * 10),
                  reservable: true
                });
              }
            });

            setParkings(tempParking);
          } else {
            console.error('Error calculating distances:', status);
          }
        }
      );
    }
  }, [isMapLoaded, currentLocation]);

  return { parkings, setParkings };
};

export default useFetchParkingInformation;
