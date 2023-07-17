import React from 'react';

import { useAtom } from 'jotai';
import { Card } from 'react-bootstrap';

import ReserveParkingIMG from '../../assets/reserve-parking.webp';
import timeRangeAtom from '../../atoms/timeRange.atom';
import { TRANSACTION_FEE } from '../../constants/prices';
import calculateTotalPrice from '../../functions/calculateTotalPrice';
import IParking from '../../interfaces/IParking';
import CustomRating from '../utils/CustomRating';

interface Props {
  parking: IParking;
}

const ReserverParkingCard = ({ parking }: Props) => {
  const [timeRange] = useAtom(timeRangeAtom);

  const totalPrice = calculateTotalPrice(
    timeRange.startTime,
    timeRange.endTime,
    parking.hourlyPrice
  );

  return (
    <Card className="px-2 shadow-sm border">
      <Card.Img variant="top" src={ReserveParkingIMG} />
      <Card.Body>
        <Card.Title>{parking.address}</Card.Title>
        <CustomRating
          ratingRate={3}
          readonly
          ratingCount={10}
          starSize={20}
          className="mb-2"
        />
        <Card.Text className="d-flex mt-4 justify-content-between">
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
                ? `${(totalPrice + TRANSACTION_FEE).toFixed(2)}`
                : 'FREE'}
            </p>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReserverParkingCard;
