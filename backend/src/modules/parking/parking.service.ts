import { CreateParkingDto, ParkingsWithinRangeDto } from 'src/dto/parking.dto';
import IParking from 'src/interfaces/IParking';
import IToken from 'src/interfaces/IToken';

export interface ParkingService {
  createParking(createParkingDto: CreateParkingDto, tokenData: IToken);

  getParkingsWithinRange(parkingsWithinRangeDto: ParkingsWithinRangeDto);

  deleteParking(id: string);

  retrieveParkingById(id: string): Promise<IParking>;
}

export const ParkingService = Symbol('ParkingService');
