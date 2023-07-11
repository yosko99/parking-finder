import IParking from './IParking';
import IUser from './IUser';

interface IReview {
  id: number;
  rating: number;
  comment: string;
  user: IUser;
  userId: number;
  parking: IParking;
  parkingId: number;
}

export default IReview;
