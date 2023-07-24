/* eslint-disable multiline-ternary */
import React from 'react';

import { Button, Tab, Tabs } from 'react-bootstrap';
import { VscFeedback } from 'react-icons/vsc';

import IParking from '../../interfaces/IParking';
import ReserveParkingButton from '../buttons/parking/ReserveParkingButton';

interface Props {
  parking: IParking;
}

const ParkingInfoTabBody = ({ parking }: Props) => {
  return (
    <>
      <Tabs defaultActiveKey="info" className="mb-3 w-100" justify>
        <Tab eventKey="info" title="Info">
          <p className="text-center fs-3">Information</p>
          <div className="d-flex mx-3 justify-content-between">
            <div>
              <p>Title:</p>
              <p>Distance:</p>
              <p>Duration:</p>
              <p>Hourly fee:</p>
              <p>Total spaces:</p>
              <p>Free spaces:</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p>{parking.title}</p>
              <p>{parking.distance}</p>
              <p>{parking.duration}</p>
              <p>{parking.hourlyPrice}$</p>
              <p>{parking.parkingSize}</p>
              <p>{parking.freeSpaces}</p>
            </div>
          </div>
        </Tab>
        <Tab eventKey="description" title="Description">
          <p className="text-center fs-3">Description</p>
          <p className="mx-3">{parking.description}</p>
        </Tab>
        <Tab eventKey="reviews" title="Reviews">
          <p className="text-center fs-3">Reviews</p>
          {parking.reviews.length === 0 ? (
            <div className="text-center fs-2 mx-3 text-dark mb-3">
              <p>
                Currently, this parking does not have any reviews. Be the first
                one to make one!
              </p>
              <div>
                <VscFeedback size={60} />
              </div>
              <Button variant="warning">Add a review</Button>
            </div>
          ) : (
            parking.reviews.map((review, index) => (
              <div key={index}>{review.comment}</div>
            ))
          )}
        </Tab>
      </Tabs>
      <ReserveParkingButton index={-1} className="w-100" parking={parking} />
    </>
  );
};

export default ParkingInfoTabBody;
