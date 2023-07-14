import { CreateReservationDto } from 'src/dto/reservation.dto';
import IReservation from 'src/interfaces/IReservation';
import IToken from 'src/interfaces/IToken';

export interface ReservationService {
  createReservation(
    createReservationDto: CreateReservationDto,
    tokenData: IToken,
  );

  getNumberOfOverlappingReservations(
    startTime: string,
    endTime: string,
    reservations: IReservation[],
  );
}

export const ReservationService = Symbol('ReservationService');
