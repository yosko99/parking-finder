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
  reviews: IReview[];
  parkingSpaces: IParkingSpace[];
  mapZoomLevel: number;
}

export default IParking;
