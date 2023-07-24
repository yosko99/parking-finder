/* eslint-disable multiline-ternary */
import React, { useRef, useState } from 'react';

import { Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import { useAtom } from 'jotai';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FaLocationArrow } from 'react-icons/fa';

import currentLocationAtom from '../../atoms/currentLocation.atom';
import directionsAtom from '../../atoms/directions.atom';
import mainMapAtom from '../../atoms/mainMap.atom';
import { getGeocodeRoute } from '../../constants/apiRoute';
import getCurrentLocation from '../../functions/getCurrentLocation';
import IGeocodingResponse from '../../interfaces/IGeocodingResponse';

const CurrentLocationInput = () => {
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);
  const [directions, setDirections] = useAtom(directionsAtom);
  const [mainMap] = useAtom(mainMapAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = () => {
    const address = inputRef.current?.value as string;
    setDirections(null);

    axios
      .get(getGeocodeRoute(address))
      .then((response) => {
        const data = response.data as IGeocodingResponse;
        if (data.status === 'OK') {
          setInputValue(data.formatted_address);
          setCurrentLocation(data.results[0].geometry.location);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    setInputValue('');
    setDirections(null);
    getCurrentLocation().then((value) => setCurrentLocation(value));
  };

  return mainMap !== null ? (
    <Autocomplete onPlaceChanged={handleInputChange}>
      <Form.Group className="d-flex">
        <Form.Control
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          ref={inputRef}
          placeholder="Your location..."
        />
        <Button onClick={handleClick} variant="info">
          <FaLocationArrow size={20} role="button" />
        </Button>
      </Form.Group>
    </Autocomplete>
  ) : (
    <Spinner />
  );
};

export default CurrentLocationInput;
