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
}

export default IUser;
