import ICoordinate from './ICoordinate';

interface IParkingSpace {
  paths: ICoordinate[];
  angle: number;
  id?: number;
  isCurrentlyTaken?: boolean;
}

export default IParkingSpace;
