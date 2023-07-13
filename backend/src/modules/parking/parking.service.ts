import { CreateParkingDto, ParkingsWithinRangeDto } from 'src/dto/parking.dto';
import IToken from 'src/interfaces/IToken';

export interface ParkingService {
  createParking(createParkingDto: CreateParkingDto, tokenData: IToken);

  getParkingsWithinRange(parkingsWithinRangeDto: ParkingsWithinRangeDto);

  deleteParking(id: string);
}

export const ParkingService = Symbol('ParkingService');
