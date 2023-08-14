/* eslint-disable multiline-ternary */
import React from 'react';

import { Alert, Table } from 'react-bootstrap';

import getFormattedISODate from '../../functions/getFormattedISODate';
import IReservation from '../../interfaces/IReservation';

interface Props {
  reservations: IReservation[];
  isPersonal: boolean;
}

const ReservationsTable = ({ reservations, isPersonal }: Props) => {
  return reservations.length === 0 ? (
    <Alert variant="info" className="mb-5">
      No reservations at this moment
    </Alert>
  ) : (
    <div style={{ overflow: 'auto' }}>
      <Table
        striped
        bordered
        hover
        className="my-4 mb-5 shadow-sm border"
        variant="white"
      >
        <thead>
          <tr>
            {!isPersonal && <th>Customer name</th>}
            <th>Plate number</th>
            <th>Total cost</th>
            <th>Date from</th>
            <th>Date to</th>
            <th>Total duration</th>
            {!isPersonal && <th>Country</th>}
            <th>Is active?</th>
          </tr>
        </thead>
        <tbody>
          {reservations?.map((reservation, index) => (
            <tr key={index}>
              {!isPersonal && <td>{reservation.user.name}</td>}
              <td>{reservation.registrationNumber}</td>
              <td>$ {reservation.totalPrice.toFixed(2)}</td>
              <td>{getFormattedISODate(reservation.startTime)}</td>
              <td>{getFormattedISODate(reservation.endTime)}</td>
              <td>{reservation.totalDuration}</td>
              {!isPersonal && (
                <td>
                  {reservation.country ? reservation.country : 'Not specified'}
                </td>
              )}
              <td>{reservation.isActive ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReservationsTable;
