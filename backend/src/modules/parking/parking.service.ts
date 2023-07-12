import { CreateParkingDto } from 'src/dto/parking.dto';
import IToken from 'src/interfaces/IToken';

export interface ParkingService {
  createParking(createParkingDto: CreateParkingDto, tokenData: IToken);

  getParkingsWithinRange(lat: number, lng: number);

  deleteParking(id: string);
}

export const ParkingService = Symbol('ParkingService');
