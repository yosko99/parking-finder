import React from 'react';

import DatePicker from '../sidebar/elements/DatePicker';
import CustomModal from '../utils/CustomModal';

interface Props {
  date: string;
}

const BookingInformationDateModal = ({ date }: Props) => {
  return (
    <CustomModal
      modalHeader="Update reservation date"
      activateButtonElement={
        <p
          className="fs-4 my-2"
          style={{ textDecoration: 'underline', fontWeight: 'bold' }}
        >
          {date}
        </p>
      }
      modalBody={
        <div className="pb-5 px-3 pt-2">
          <DatePicker />
        </div>
      }
    />
  );
};

export default BookingInformationDateModal;
