import React from 'react';

import { useAtom } from 'jotai';
import { Alert, Card } from 'react-bootstrap';

import timeRangeAtom from '../../atoms/timeRange.atom';
import { TRANSACTION_FEE } from '../../constants/prices';
import calculateTotalPrice from '../../functions/calculateTotalPrice';
import IParking from '../../interfaces/IParking';
import ReserveParkingMap from '../maps/ReserveParkingMap';
import CustomRating from '../utils/CustomRating';

interface Props {
  parking: IParking;
  freeSpaces: number;
}

const ReserverParkingCard = ({ parking, freeSpaces }: Props) => {
  const [timeRange] = useAtom(timeRangeAtom);

  const totalPrice = calculateTotalPrice(
    timeRange.startTime,
    timeRange.endTime,
    parking.hourlyPrice
  );

  const totalReviews =
    parking.reviews.length === 0 ? 1 : parking.reviews.length;
  const averageReviewRate = Math.round(
    parking.reviews.reduce((a, b) => a + b.rating, 0) / totalReviews
  );

  return (
    <Card className="px-2 shadow-sm border">
      <ReserveParkingMap
        coordinates={{ lat: parking.lat!, lng: parking.lng! }}
      />
      <Card.Body>
        <Alert
          variant={freeSpaces !== 0 ? 'info' : 'danger'}
          className="text-center p-2"
        >
          Free spaces: {freeSpaces}
        </Alert>
        <Card.Title>{parking.address}</Card.Title>
        <CustomRating
          ratingRate={averageReviewRate}
          readonly
          ratingCount={parking.reviews.length}
          starSize={20}
          className="mb-2"
        />
        <div className="d-flex mt-4 justify-content-between">
          <div>
            <p>Hourly price:</p>
            <p>Total price:</p>
            <p>Transaction fee:</p>
            <p className="fs-4" style={{ fontWeight: 'bold' }}>
              Final price
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p>${parking.hourlyPrice.toFixed(2)}</p>
            <p>${totalPrice.toFixed(2)}</p>
            <p>
              $
              {totalPrice !== 0
                ? TRANSACTION_FEE.toFixed(2)
                : totalPrice.toFixed(2)}
            </p>
            <p className="fs-4" style={{ fontWeight: 'bold' }}>
              {totalPrice !== 0
                ? `$${(totalPrice + TRANSACTION_FEE).toFixed(2)}`
                : 'FREE'}
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReserverParkingCard;
