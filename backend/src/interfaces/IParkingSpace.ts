import ICoordinate from './ICoordinate';
import IReservation from './IReservation';

interface IParkingSpace {
  paths: ICoordinate[];
  angle: number;
  id?: string;
  reservations: IReservation[];
  isCurrentlyTaken?: boolean;
}

export default IParkingSpace;
