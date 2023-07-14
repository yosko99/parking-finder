import IReservation from './IReservation';
import IReview from './IReview';

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
}

export default IParking;
