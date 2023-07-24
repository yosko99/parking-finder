import ICoordinate from './ICoordinate';
import IParkingSpace from './IParkingSpace';
import IReview from './IReview';

interface IParking {
  id: string;
  address: string;
  reservable: boolean;
  hourlyPrice: number;
  title: string;
  duration: string;
  distance: string;
  description: string;
  freeSpaces: number;
  parkingSize: number;
  lat?: number;
  lng?: number;
  coordinates: ICoordinate;
  reviews: IReview[];
  parkingSpaces: IParkingSpace[];
}

export default IParking;
