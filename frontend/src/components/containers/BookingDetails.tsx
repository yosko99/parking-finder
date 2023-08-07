import React from 'react';

import { useAtom } from 'jotai';
import { BiTimeFive } from 'react-icons/bi';
import { TbCalendarUp, TbCalendarX, TbParking } from 'react-icons/tb';

import timeRangeAtom from '../../atoms/timeRange.atom';
import getDurationInWords from '../../functions/getDurationInWords';
import getFormattedISODate from '../../functions/getFormattedISODate';
import BookingInformationDateModal from '../modals/BookingInformationDateModal';

interface Props {
  selectedParkingSpaceIndex: number;
}

const BookingDetails = ({ selectedParkingSpaceIndex }: Props) => {
  const [timeRange] = useAtom(timeRangeAtom);

  return (
    <div className="shadow-sm border py-2 mb-4">
      <p className="fs-2 m-4">Booking details</p>
      <div className="d-flex m-4 justify-content-between">
        <div>
          <p className="fs-4 my-2">
            <TbCalendarUp className="me-3 mb-1" /> Arriving on
          </p>
          <p className="fs-4 my-2">
            <TbCalendarX className="me-3 mb-1" /> Leaving on
          </p>
          <p className="fs-4 my-2">
            <BiTimeFive className="me-3 mb-1" /> Duration
          </p>
          <p className="fs-4 my-2">
            <TbParking className="me-3 mb-1" /> Parking space number
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <BookingInformationDateModal
            date={getFormattedISODate(timeRange.startTime)}
          />
          <BookingInformationDateModal
            date={getFormattedISODate(timeRange.endTime)}
          />
          <p className="fs-4 my-2">
            {getDurationInWords(
              new Date(timeRange.startTime).valueOf() -
                new Date(timeRange.endTime).valueOf()
            )}
          </p>
          <p className="fs-4 my-2">{selectedParkingSpaceIndex}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
