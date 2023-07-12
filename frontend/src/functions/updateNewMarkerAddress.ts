import React from 'react';

import axios from 'axios';

import { getReverseGeocodeRoute } from '../constants/apiRoute';
import IGeocodingResponse from '../interfaces/IGeocodingResponse';

const updateNewMarkerAddress = (
  lat: number,
  lng: number,
  setNewMarkerAddress: React.Dispatch<React.SetStateAction<any>>
) => {
  axios
    .get(getReverseGeocodeRoute(lat, lng))
    .then((response) => {
      const data = response.data as IGeocodingResponse;
      if (data.status === 'OK') {
        const result = data.results[0].formatted_address;
        const address = result || '';
        setNewMarkerAddress({
          coords: { lat, lng },
          address
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export default updateNewMarkerAddress;
