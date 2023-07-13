import ICoordinate from './ICoordinate';
import IReview from './IReview';

interface IParking {
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
}

export default IParking;
