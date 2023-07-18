import IReservation from 'src/interfaces/IReservation';
import doDatesOverlap from './doDatesOverlap';

const getNumberOfOverlappingReservations = (
  startTime: string,
  endTime: string,
  reservations: IReservation[],
) => {
  let collisionCount = 0;

  for (let i = 0; i < reservations.length; i++) {
    const reservation = reservations[i];

    if (
      doDatesOverlap(
        new Date(startTime),
        new Date(endTime),
        new Date(reservation.startTime),
        new Date(reservation.endTime),
      ) &&
      reservation.isActive
    ) {
      collisionCount++;
    }
  }

  return collisionCount;
};

export default getNumberOfOverlappingReservations;
