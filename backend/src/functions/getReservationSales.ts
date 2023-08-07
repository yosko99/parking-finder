import IReservation from 'src/interfaces/IReservation';

const getReservationSales = (
  hourlyPrice: number,
  reservation: IReservation,
): number => {
  const startTime = new Date(reservation.startTime);
  const endTime = new Date(reservation.endTime);

  const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  return duration * hourlyPrice;
};

export default getReservationSales;
