import IParking from './IParking';
import IReservation from './IReservation';
import IReview from './IReview';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  isCompany: boolean;
  reservations: IReservation[];
  reviews: IReview[];
  ownedParkings: IParking[];
}

export default IUser;
