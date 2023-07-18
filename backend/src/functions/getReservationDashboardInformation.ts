import TimeFrameEnum from 'src/enums/TimeFrameEnum';
import IDashboardResponse from 'src/interfaces/IDashboardResponse';
import IReservation from 'src/interfaces/IReservation';
import calculateTotalPrice from './calculateTotalPrice';
import getTimeBoundary from './getTimeBoundary';
import getReservationSales from './getReservationSales';
import setMapValue from './setMapValue';

const getReservationDashboardInformation = (
  reservations: IReservation[],
  hourlyPrice: number,
  timeFrame: TimeFrameEnum,
): IDashboardResponse => {
  const timeBoundary = getTimeBoundary(timeFrame);
  const sales: number[] = [];
  const locationsMap: Map<string, number> = new Map();
  let totalSales = 0;

  reservations = reservations.sort(
    (a, b) => new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf(),
  );

  reservations.forEach((reservation) => {
    if (
      new Date(reservation.startTime) > timeBoundary &&
      new Date(reservation.endTime) < new Date()
    ) {
      sales.push(getReservationSales(hourlyPrice, reservation));
      totalSales += calculateTotalPrice(
        reservation.startTime,
        reservation.endTime,
        hourlyPrice,
      );

      setMapValue(reservation.country, locationsMap);
    }
  });

  return {
    totalSales,
    sales,
    averageSales: totalSales / reservations.length,
    totalReservations: reservations.length,
    locations: Array.from(locationsMap).map(([key, value]) => ({
      country: key,
      count: value,
    })),
  };
};

export default getReservationDashboardInformation;
