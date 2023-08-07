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
  registrationNumber: string;
  totalPrice: number;
  totalDuration: string;
  country?: string;
  isActive: boolean;
}

export default IReservation;
