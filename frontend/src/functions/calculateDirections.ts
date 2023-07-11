import React from 'react';

import ICoordinate from '../interfaces/ICoordinate';

const calculateDirections = (
  currentLocation: ICoordinate,
  selectedDestination: string,
  setDirections: React.Dispatch<React.SetStateAction<any>>,
  setSelectedDirectionIndex: React.Dispatch<React.SetStateAction<number>>,
  index: number
) => {
  try {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    directionsService
      .route({
        origin: currentLocation,
        destination: selectedDestination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING
      })
      .then((response) => {
        setDirections(response);
        setSelectedDirectionIndex(index);
      });
  } catch (error) {
    console.log(error);
  }
};

export default calculateDirections;
