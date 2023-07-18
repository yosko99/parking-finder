import TimeFrameEnum from 'src/enums/TimeFrameEnum';
import IDashboardResponse from 'src/interfaces/IDashboardResponse';
import IReservation from 'src/interfaces/IReservation';
import calculateTotalPrice from './calculateTotalPrice';
import getTimeBoundary from './getTimeBoundary';
import getReservationSales from './getReservationSales';
import setMapValue from './setMapValue';
import getNumberOfOverlappingReservations from './getNumberOfOverlappingReservations';

const getReservationDashboardInformation = (
  reservations: IReservation[],
  hourlyPrice: number,
  timeFrame: TimeFrameEnum,
  parkingSize: number,
): IDashboardResponse => {
  const timeBoundary = getTimeBoundary(timeFrame);
  const sales: any[] = [];
  const locationsMap: Map<string, number> = new Map();
  let totalSales = 0;
  let totalDuration = 0;

  reservations
    .filter((reservation) => new Date(reservation.startTime) > timeBoundary)
    .forEach((reservation, index) => {
      sales.push({
        value: getReservationSales(hourlyPrice, reservation),
        name: index,
      });

      totalSales += calculateTotalPrice(
        reservation.startTime,
        reservation.endTime,
        hourlyPrice,
      );

      setMapValue(reservation.country, locationsMap);

      totalDuration +=
        new Date(reservation.endTime).valueOf() -
        new Date(reservation.startTime).valueOf();
    });

  const reservationCount = reservations.length;

  const averageDuration =
    reservationCount !== 0 ? totalDuration / reservationCount : 0;
  const averageSales =
    reservationCount !== 0 ? totalSales / reservationCount : 0;

  const locations = Array.from(locationsMap).map(([key, value]) => ({
    name: key,
    value,
  }));

  const currentDate = new Date();
  const freeSpaces = [
    { name: 'Total spaces', value: parkingSize },
    {
      name: 'Free spaces',
      value:
        parkingSize -
        getNumberOfOverlappingReservations(
          currentDate.setDate(currentDate.getDate() - 1).toString(),
          currentDate.toISOString(),
          reservations,
        ),
    },
  ];

  return {
    totalSales,
    sales,
    averageDuration,
    averageSales,
    totalReservations: reservationCount,
    locations,
    freeSpaces,
  };
};

export default getReservationDashboardInformation;
