import IReservation from 'src/interfaces/IReservation';

const getReservationSales = (
  hourlyPrice: number,
  reservation: IReservation,
): number => {
  const startTime = new Date(reservation.startTime);
  const endTime = new Date(reservation.endTime);

  const endDate = new Date(
    startTime.getFullYear(),
    startTime.getMonth(),
    startTime.getDate(),
    endTime.getHours(),
    endTime.getMinutes(),
    endTime.getSeconds(),
  );

  const duration = (endDate.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  return duration * hourlyPrice;
};

export default getReservationSales;
