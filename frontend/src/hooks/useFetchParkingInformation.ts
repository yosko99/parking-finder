import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import useFetch from './useFetch';
import currentLocationAtom from '../atoms/currentLocation.atom';
import mainMapAtom from '../atoms/mainMap.atom';
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
  const [mainMap] = useAtom(mainMapAtom);
  const { data, isLoading } = useFetch(fetchURL, fetchURL, true, false);

  const closestParkings = data as IParking[];

  const [parkings, setParkings] = useState<IParking[]>([]);

  useEffect(() => {
    if (mainMap !== null && !isLoading) {
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
                  id: closestParkings[index].id,
                  parkingSpaces: closestParkings[index].parkingSpaces,
                  reviews: closestParkings[index].reviews,
                  title: closestParkings[index].title,
                  address: response?.destinationAddresses[index] || '',
                  duration: element.duration.text,
                  distance: element.distance.text,
                  hourlyPrice: closestParkings[index].hourlyPrice,
                  reservable: true,
                  description: closestParkings[index].description,
                  freeSpaces: closestParkings[index].freeSpaces,
                  parkingSize: closestParkings[index].parkingSize,
                  coordinates: {
                    lat: closestParkings[index].lat!,
                    lng: closestParkings[index].lng!
                  }
                });
              }
            });

            setParkings(tempParking);
          } else {
            setParkings([]);
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
