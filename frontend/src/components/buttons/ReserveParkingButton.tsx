import React from 'react';

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import IParking from '../../interfaces/IParking';

interface Props {
  parking: IParking;
  className?: string;
}

const ReserveParkingButton = ({ parking, className }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/reserve-parking', { state: { parking } });
  };

  return (
    <Button className={className} onClick={handleClick} variant="success">
      Reserve
    </Button>
  );
};

export default ReserveParkingButton;
