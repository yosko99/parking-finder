import IParking from './IParking';
import IUser from './IUser';

interface IReservation {
  id: number;
  startTime: string;
  endTime: string;
  user: IUser;
  userId: number;
  parking: IParking;
  parkingId: number;
}

export default IReservation;
