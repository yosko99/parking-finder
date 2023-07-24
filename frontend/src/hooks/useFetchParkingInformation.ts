import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import useFetch from './useFetch';
import currentLocationAtom from '../atoms/currentLocation.atom';
import mainMapAtom from '../atoms/mainMap.atom';
import timeRangeAtom from '../atoms/timeRange.atom';
import { getParkingsWithinRangeRoute } from '../constants/apiRoute';
import IParking from '../interfaces/IParking';

const useFetchParkingInformation = () => {
  const [currentLocation] = useAtom(currentLocationAtom);
  const [timeRange] = useAtom(timeRangeAtom);

  const fetchURL = getParkingsWithinRangeRoute(
    currentLocation.lat,
    currentLocation.lng,
    timeRange.startTime,
    timeRange.endTime
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
                  ...closestParkings[index],
                  reservable: true,
                  duration: element.duration.text,
                  distance: element.distance.text
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
  }, [currentLocation, closestParkings?.length]);

  return { parkings, setParkings };
};

export default useFetchParkingInformation;
