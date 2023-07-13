import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import useFetch from './useFetch';
import currentLocationAtom from '../atoms/currentLocation.atom';
import isMapLoadedAtom from '../atoms/isMapLoaded.atom';
import { getParkingsWithinRangeRoute } from '../constants/apiRoute';
import IParking from '../interfaces/IParking';

const useFetchParkingInformation = (
  startTimeISOString: string,
  endTimeISOString: string
) => {
  const [currentLocation] = useAtom(currentLocationAtom);
  const fetchURL = getParkingsWithinRangeRoute(
    currentLocation.lat,
    currentLocation.lng,
    startTimeISOString,
    endTimeISOString
  );
  const [isMapLoaded] = useAtom(isMapLoadedAtom);
  const { data, isLoading } = useFetch(fetchURL, fetchURL, true, false);

  const closestParkings = data as IParking[];

  const [parkings, setParkings] = useState<IParking[]>([]);

  useEffect(() => {
    if (isMapLoaded && !isLoading && closestParkings.length > 0) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [currentLocation],
          // @ts-ignore
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
                  title: data[index].title,
                  address: response?.destinationAddresses[index] || '',
                  duration: element.duration.text,
                  distance: element.distance.text,
                  hourlyPrice: closestParkings[index].hourlyPrice,
                  reservable: true,
                  coordinates: {
                    lat: closestParkings[index].lat!,
                    lng: closestParkings[index].lng!
                  }
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
  }, [
    currentLocation,
    closestParkings?.length,
    startTimeISOString,
    endTimeISOString
  ]);

  return { parkings, setParkings };
};

export default useFetchParkingInformation;
