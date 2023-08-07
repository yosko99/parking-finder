import IParkingSpace from './IParkingSpace';
import IReservation from './IReservation';
import IReview from './IReview';
import IUser from './IUser';

interface IParking {
  id: string;
  description: string;
  address: string;
  hourlyPrice: number;
  title: string;
  parkingSize: number;
  lat: number;
  lng: number;
  reviews: IReview[];
  reservations: IReservation[];
  freeSpaces?: number;
  owner: IUser;
  parkingSpaces: IParkingSpace[];
}

export default IParking;
