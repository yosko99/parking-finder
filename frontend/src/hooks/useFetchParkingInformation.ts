import axios from 'axios';
import { useAtom } from 'jotai';

import mainMapAtom from '../atoms/mainMap.atom';
import parkingsAtom from '../atoms/parkings.atom';
import tokenAtom from '../atoms/token.atom';
import { getParkingsWithinRangeRoute } from '../constants/apiRoute';
import ICoordinate from '../interfaces/ICoordinate';
import IParking from '../interfaces/IParking';
import ITimeRange from '../interfaces/ITameRange';

const useFetchParkingInformation = () => {
  const [parkings, setParkings] = useAtom(parkingsAtom);
  const [mainMap] = useAtom(mainMapAtom);
  const [token] = useAtom(tokenAtom);

  const getParkingInfo = (
    timeRange: ITimeRange,
    currentCoords: ICoordinate
  ) => {
    if (mainMap !== null) {
      const fetchURL = getParkingsWithinRangeRoute(
        currentCoords.lat,
        currentCoords.lng,
        timeRange.startTime,
        timeRange.endTime
      );

      axios
        .get(fetchURL, {
          headers: { authorization: 'Bearer ' + token }
        })
        .then((response) => {
          const closestParkings = response.data as IParking[];

          const service = new window.google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: [currentCoords],
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
        });
    }
  };

  return { parkings, setParkings, getParkingInfo };
};

export default useFetchParkingInformation;
