/* eslint-disable indent */
import React, { useState } from 'react';

import { useAtom } from 'jotai';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import timeRangeAtom from '../../atoms/timeRange.atom';
import { getReservationsRoute } from '../../constants/apiRoute';
import { TRANSACTION_FEE } from '../../constants/prices';
import calculateTotalPrice from '../../functions/calculateTotalPrice';
import getDurationInWords from '../../functions/getDurationInWords';
import useAuthenticatedFormSubmit from '../../hooks/useAuthenticatedFormSubmit';
import useFormUpdate from '../../hooks/useFormUpdate';
import ICarRegistration from '../../interfaces/ICarRegistration';
import IParking from '../../interfaces/IParking';
import PaymentInformation from '../containers/PaymentInformation';
import VehicleInformation from '../containers/VehicleInformation';
import CustomAlert from '../utils/CustomAlert';
import LoadingSpinner from '../utils/LoadingSpinner';

interface Props {
  parking: IParking;
  canReserve: boolean;
}

const ReserveParkingForm = ({ parking, canReserve }: Props) => {
  const navigate = useNavigate();

  const [registrationNumber, setRegistrationNumber] =
    useState<ICarRegistration>({ number: '', isSubmitted: false });
  const { formData, handleChange } = useFormUpdate();
  const { alert, handleSubmit, isLoading } = useAuthenticatedFormSubmit(
    getReservationsRoute(),
    false,
    false,
    () => {
      navigate('/reservation-complete', { state: {} });
    }
  );
  const [registrationNumberAlert, setRegistrationNumberAlert] =
    useState<React.ReactNode>(null);
  const [{ startTime, endTime }] = useAtom(timeRangeAtom);

  const totalPrice = calculateTotalPrice(
    startTime,
    endTime,
    parking.hourlyPrice
  );

  const handleCreateReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!registrationNumber.isSubmitted) {
      setRegistrationNumberAlert(
        <CustomAlert
          variant="warning"
          text="Please, first add your registration number"
        />
      );
    } else {
      setRegistrationNumberAlert(null);
      handleSubmit({
        ...formData,
        startTime,
        endTime,
        totalDuration: getDurationInWords(startTime, endTime),
        parkingId: parking.id
      });
    }
  };

  return (
    <Form
      onChange={handleChange}
      className="mb-5"
      onSubmit={handleCreateReservation}
    >
      <VehicleInformation
        registrationNumber={registrationNumber}
        setRegistrationNumber={setRegistrationNumber}
      />
      {totalPrice !== 0 && <PaymentInformation />}
      <Button
        type="submit"
        disabled={!canReserve}
        className="mt-3 w-100 rounded fs-4 mt-2 mb-2 text-capitalize"
        variant={canReserve ? 'success' : 'danger'}
      >
        {!canReserve
          ? 'No empty spaces at selected time frame'
          : totalPrice !== 0
          ? `$${(totalPrice + TRANSACTION_FEE).toFixed(
              2
            )} - Pay now and reserve`
          : 'Reserve your parking'}
      </Button>
      <div>
        {alert}
        {registrationNumberAlert}
        {isLoading && <LoadingSpinner />}
      </div>
    </Form>
  );
};

export default ReserveParkingForm;
