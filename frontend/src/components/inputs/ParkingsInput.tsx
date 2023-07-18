/* eslint-disable multiline-ternary */
import React from 'react';

import { Form, Image } from 'react-bootstrap';

import noParkingImg from '../../assets/no-parking.png';
import { getCurrentUserParkingsRoute } from '../../constants/apiRoute';
import useFetch from '../../hooks/useFetch';
import IParking from '../../interfaces/IParking';
import CenteredItems from '../../styles/CenteredItems';
import LoadingSpinner from '../utils/LoadingSpinner';

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ParkingsInput = ({ handleChange }: Props) => {
  const { data, isLoading } = useFetch(
    'current-user-parkings',
    getCurrentUserParkingsRoute(),
    true,
    true
  );

  const parkings = data as IParking[];

  return isLoading ? (
    <LoadingSpinner />
  ) : parkings.length === 0 ? (
    <CenteredItems flexColumn>
      <Image src={noParkingImg} />
      <p className="text-center m-0 fs-1">
        Currently you do not have any parkings but you can add some
      </p>
    </CenteredItems>
  ) : (
    <Form.Group className="mb-3">
      <Form.Label>Parkings</Form.Label>
      <Form.Select name="parking" onChange={handleChange}>
        <option value={''}></option>
        {parkings.map((parking, index) => (
          <option value={parking.title} key={index}>
            {parking.title}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default ParkingsInput;
