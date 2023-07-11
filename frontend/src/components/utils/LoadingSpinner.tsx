import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

interface Props {
  height?: string;
}

const LoadingSpinner = ({ height }: Props) => {
  return (
    <div
      className="d-flex w-100 justify-content-center align-items-center"
      style={{ height }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
