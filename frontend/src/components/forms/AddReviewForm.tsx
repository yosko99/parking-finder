import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';

import { getParkingReviewsRoute } from '../../constants/apiRoute';
import useAuthenticatedFormSubmit from '../../hooks/useAuthenticatedFormSubmit';
import useFetchParkingInformation from '../../hooks/useFetchParkingInformation';
import IParking from '../../interfaces/IParking';

interface Props {
  parking: IParking;
}

const AddReviewForm = ({ parking }: Props) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const { getParkingInfo } = useFetchParkingInformation();

  const { alert, handleSubmit } = useAuthenticatedFormSubmit(
    getParkingReviewsRoute(parking.id),
    false,
    true,
    () => {
      if (comment.length >= 3) {
        getParkingInfo();
        setComment('');
      }
    }
  );

  const handleRatingChange = (rate: number) => {
    setRating(rate);
  };

  const createReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ comment, rating });
  };

  return (
    <Form
      onSubmit={createReview}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          className="border"
          required
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here.."
          minLength={3}
        />
      </Form.Group>
      <Rating onClick={handleRatingChange} transition />
      <Button variant="warning" type="submit" className="mt-3">
        Add a review
      </Button>
      {alert}
    </Form>
  );
};

export default AddReviewForm;
