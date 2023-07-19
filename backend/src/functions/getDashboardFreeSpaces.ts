import IReservation from 'src/interfaces/IReservation';
import getNumberOfOverlappingReservations from './getNumberOfOverlappingReservations';

const getDashboardFreeSpaces = (
  parkingSize: number,
  reservations: IReservation[],
) => {
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

  return freeSpaces;
};

export default getDashboardFreeSpaces;
