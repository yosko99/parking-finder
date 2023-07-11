import IReservation from './IReservation';
import IReview from './IReview';

interface IParking {
  id: number;
  description: string;
  address: string;
  hourlyPrice: number;
  lat: number;
  lng: number;
  reviews: IReview[];
  reservations: IReservation[];
}

export default IParking;
