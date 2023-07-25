import React from 'react';

import { Rating } from 'react-simple-star-rating';

interface Props {
  comment: string;
  rating: number;
}

const Review = ({ comment, rating }: Props) => {
  return (
    <div className="px-3 py-2 border shadow-sm d-flex justify-content-between align-items-center my-3 mx-3">
      <p className="m-0">{comment}</p>
      <Rating initialValue={rating} size={25} readonly />
    </div>
  );
};

export default Review;
