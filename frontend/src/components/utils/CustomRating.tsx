import React, { useState, FC } from 'react';

import { Rating } from 'react-simple-star-rating';

interface Props {
  ratingRate: number;
  ratingCount: number;
  starSize?: number;
  className?: string;
  readonly: boolean;
}

const CustomRating: FC<Props> = ({
  ratingRate,
  starSize,
  className,
  ratingCount,
  readonly
}) => {
  const [rating, setRating] = useState(0); // initial rating value

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <>
      <Rating
        onClick={handleRating}
        // @ts-ignore
        ratingValue={rating}
        readonly={readonly}
        initialValue={ratingRate}
        size={starSize}
        transition
        className={className}
      />
      <span className="text-muted ms-2">
        average {ratingRate} out of {ratingCount}
      </span>
    </>
  );
};

export default CustomRating;
