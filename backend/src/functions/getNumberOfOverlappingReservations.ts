import IReservation from 'src/interfaces/IReservation';

const dateRangeOverlaps = (
  startTime: Date,
  endTime: Date,
  reservationStartTime: Date,
  reservationEndTime: Date,
) => {
  if (startTime <= reservationStartTime && reservationStartTime <= endTime) {
    return true;
  }
  if (startTime <= reservationEndTime && reservationEndTime <= endTime) {
    return true;
  }
  if (reservationStartTime < startTime && endTime < reservationEndTime) {
    return true;
  }

  return false;
};

const getNumberOfOverlappingReservations = (
  startTime: string,
  endTime: string,
  reservations: IReservation[],
) => {
  let collisionCount = 0;

  for (let i = 0; i < reservations.length; i++) {
    const reservation = reservations[i];

    if (
      dateRangeOverlaps(
        new Date(startTime),
        new Date(endTime),
        new Date(reservation.startTime),
        new Date(reservation.endTime),
      )
    ) {
      collisionCount++;
    }
  }

  return collisionCount;
};

export default getNumberOfOverlappingReservations;
