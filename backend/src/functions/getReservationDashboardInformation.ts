import TimeFrameEnum from 'src/enums/TimeFrameEnum';
import IDashboardResponse from 'src/interfaces/IDashboardResponse';
import IReservation from 'src/interfaces/IReservation';
import getTimeBoundary from './getTimeBoundary';
import getReservationSales from './getReservationSales';
import setMapValue from './setMapValue';
import ISales from 'src/interfaces/ISales';
import calculateAverage from './calculateAverage';
import getDashboardFreeSpaces from './getDashboardFreeSpaces';
import getSalesInfo from './getSalesInfo';

const getReservationDashboardInformation = (
  reservations: IReservation[],
  hourlyPrice: number,
  timeFrame: TimeFrameEnum,
  parkingSize: number,
): IDashboardResponse => {
  const { prevTimeFrame, selectedTimeFrame } = getTimeBoundary(
    new Date(),
    timeFrame,
    true,
  );

  let sales: ISales[] = [];
  const locationsMap: Map<string, number> = new Map();
  let totalSales = 0;
  let totalDuration = 0;

  let totalSalesPrev = 0;
  let totalDurationPrev = 0;
  let reservationCountPrev = 0;

  reservations.forEach((reservation) => {
    const isCurrentTimeFrame =
      new Date(reservation.startTime) > selectedTimeFrame;
    const isPreviousTimeFrame =
      new Date(reservation.startTime) > prevTimeFrame &&
      new Date(reservation.endTime) < selectedTimeFrame;

    const reservationSales = getReservationSales(hourlyPrice, reservation);
    const reservationDuration =
      new Date(reservation.endTime).valueOf() -
      new Date(reservation.startTime).valueOf();

    let currentSales = 0;
    let prevSales = 0;

    if (isCurrentTimeFrame) {
      currentSales = reservationSales;

      totalSales += reservation.totalPrice;

      setMapValue(reservation.country, locationsMap);

      totalDuration += reservationDuration;
    } else if (isPreviousTimeFrame) {
      prevSales = reservationSales;

      totalSalesPrev += reservation.totalPrice;

      totalDurationPrev += reservationDuration;

      reservationCountPrev++;
    }

    if (currentSales !== 0 || prevSales !== 0) {
      sales.push(
        getSalesInfo(reservation.startTime, timeFrame, currentSales, prevSales),
      );
    }
  });

  const reservationCount = reservations.length;

  const averageDuration = calculateAverage(reservationCount, totalDuration);
  const averageSales = calculateAverage(reservationCount, totalSales);

  const averageDurationPrev = calculateAverage(
    reservationCountPrev,
    totalDurationPrev,
  );
  const averageSalesPrev = calculateAverage(
    reservationCountPrev,
    totalSalesPrev,
  );

  const locations = Array.from(locationsMap).map(([key, value]) => ({
    name: key,
    value,
  }));

  sales = sales.sort((a, b) => {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
  });

  return {
    totalSales: { current: totalSales, prev: totalSalesPrev },
    sales,
    averageDuration: { current: averageDuration, prev: averageDurationPrev },
    averageSales: { current: averageSales, prev: averageSalesPrev },
    totalReservations: {
      current: reservationCount,
      prev: reservationCountPrev,
    },
    locations,
    freeSpaces: getDashboardFreeSpaces(parkingSize, reservations),
    reservations,
  };
};

export default getReservationDashboardInformation;
