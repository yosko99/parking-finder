import React from 'react';

interface Props {
  description: string;
}

const ParkingDescriptionTab = ({ description }: Props) => {
  return (
    <>
      <p className="text-center fs-3">Description</p>
      <p className="mx-3">{description}</p>
    </>
  );
};

export default ParkingDescriptionTab;
