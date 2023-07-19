import IReservation from 'src/interfaces/IReservation';
import getNumberOfOverlappingReservations from './getNumberOfOverlappingReservations';

const getDashboardFreeSpaces = (
  parkingSize: number,
  reservations: IReservation[],
) => {
  const currentDate = new Date();
  const updatedDate = new Date();
  updatedDate.setHours(updatedDate.getHours() + 1);

  const numberOfOverlappingReservations = getNumberOfOverlappingReservations(
    updatedDate.toISOString(),
    currentDate.toISOString(),
    reservations,
  );

  const freeSpacesValue =
    numberOfOverlappingReservations > parkingSize
      ? 0
      : parkingSize - numberOfOverlappingReservations;

  const freeSpaces = [
    { name: 'Total spaces', value: parkingSize },
    {
      name: 'Free spaces',
      value: freeSpacesValue,
    },
  ];

  return freeSpaces;
};

export default getDashboardFreeSpaces;
