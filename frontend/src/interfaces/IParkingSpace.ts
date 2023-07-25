import ICoordinate from './ICoordinate';

interface IParkingSpace {
  paths: ICoordinate[];
  angle: number;
  id?: number;
}

export default IParkingSpace;
