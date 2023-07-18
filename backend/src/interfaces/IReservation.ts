import IParking from './IParking';
import IUser from './IUser';

interface IReservation {
  id: string;
  startTime: string;
  endTime: string;
  user: IUser;
  userId: number;
  parking: IParking;
  parkingId: number;
  isActive: boolean;
  country?: string;
}

export default IReservation;
