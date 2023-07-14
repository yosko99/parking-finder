import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from 'src/dto/reservation.dto';
import IToken from 'src/interfaces/IToken';
import { ParkingService } from '../parking/parking.service';
import IReservation from 'src/interfaces/IReservation';

@Injectable()
export class ReservationServiceImpl implements ReservationService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ParkingService) private readonly parkingService: ParkingService,
  ) {}

  async createReservation(
    {
      endTime,
      parkingId,
      registrationNumber,
      startTime,
      totalDuration,
    }: CreateReservationDto,
    tokenData: IToken,
  ) {
    const parking = await this.parkingService.retrieveParkingById(parkingId);

    if (new Date(startTime) > new Date(endTime)) {
      throw new HttpException('End date cannot be before start date!', 400);
    }

    if (
      this.getNumberOfOverlappingReservations(
        startTime,
        endTime,
        parking.reservations,
      ) >= parking.parkingSize
    ) {
      throw new HttpException(
        'We are really sorry, the parking is full at the moment!',
        503,
      );
    }

    const newReservation = await this.prisma.reservation.create({
      data: {
        startTime,
        endTime,
        registrationNumber,
        totalDuration,
        parking: { connect: { id: parking.id } },
        user: { connect: { email: tokenData.email } },
      },
    });

    return {
      reservation: newReservation,
      message: 'Message created successfully',
    };
  }

  getNumberOfOverlappingReservations(
    startTime: string,
    endTime: string,
    reservations: IReservation[],
  ) {
    let collisionCount = 0;

    for (let i = 0; i < reservations.length; i++) {
      const reservation = reservations[i];

      if (
        new Date(reservation.startTime) === new Date(startTime) &&
        new Date(reservation.endTime) === new Date(endTime)
      ) {
        continue;
      }

      if (
        new Date(startTime) < new Date(endTime) &&
        new Date(reservation.startTime) < new Date(reservation.endTime)
      ) {
        collisionCount++;
      }
    }

    return collisionCount;
  }
}
