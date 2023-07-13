import ICoordinate from './ICoordinate';

interface IParking {
  address: string;
  reservable: boolean;
  hourlyPrice: number;
  title: string;
  duration: string;
  distance: string;
  lat?: number;
  lng?: number;
  coordinates: ICoordinate;
}

export default IParking;
