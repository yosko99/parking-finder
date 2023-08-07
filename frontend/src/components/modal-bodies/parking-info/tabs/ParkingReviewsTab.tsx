/* eslint-disable multiline-ternary */
import React, { useEffect, useRef } from 'react';

import { VscFeedback } from 'react-icons/vsc';

import IParking from '../../../../interfaces/IParking';
import CenteredItems from '../../../../styles/CenteredItems';
import Review from '../../../containers/Review';
import AddReviewForm from '../../../forms/AddReviewForm';

interface Props {
  parking: IParking;
}

const ParkingReviewsTab = ({ parking }: Props) => {
  const reviewsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reviewsContainerRef.current) {
      reviewsContainerRef.current.scrollTop =
        reviewsContainerRef.current?.scrollHeight;
    }
  }, [parking]);

  return (
    <>
      <p className="text-center fs-2">Reviews</p>
      {parking.reviews.length === 0 ? (
        <div className="text-center fs-3 mx-3 text-dark mb-3">
          <p>
            Currently, this parking does not have any reviews. Be the first one
            to make one!
          </p>
          <div>
            <VscFeedback size={60} />
          </div>
        </div>
      ) : (
        <div
          ref={reviewsContainerRef}
          style={{ height: '300px', overflow: 'overlay' }}
        >
          {parking.reviews.map((review, index) => (
            <Review
              comment={review.comment}
              rating={review.rating}
              key={index}
            />
          ))}
        </div>
      )}
      <CenteredItems className="my-3">
        <AddReviewForm parking={parking} />
      </CenteredItems>
    </>
  );
};

export default ParkingReviewsTab;
