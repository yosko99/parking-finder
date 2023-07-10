/* eslint-disable multiline-ternary */
import React from 'react';

import { AiFillCar } from 'react-icons/ai';

import useFetchParkingInformation from '../hooks/useFetchParkingInformation';

const ParkingSideBar = () => {
  const { parkings } = useFetchParkingInformation();
  return (
    <div className="m-0 pe-3">
      {parkings.map((parking, index) => (
        <div key={index} className="shadow-sm rounded p-3 my-3">
          <p className="m-0 mb-1 fs-4">
            {parking.address}{' '}
            <span className="text-muted">({parking.distance})</span>
          </p>
          {parking.reservable ? (
            <p className="text-success">RESERVABLE</p>
          ) : (
            <p className="text-danger">FULL</p>
          )}
          <div className="d-flex justify-content-between">
            <div>
              <p className="m-0 fs-4">{parking.parkingFee}$</p>
              <p className="text-muted m-0">parking fee</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="m-0 fs-4">
                <AiFillCar size={35} /> {parking.duration}
              </p>
              <p className="m-0">to destination</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParkingSideBar;
