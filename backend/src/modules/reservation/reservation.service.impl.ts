import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from 'src/dto/reservation.dto';
import IToken from 'src/interfaces/IToken';
import { ParkingService } from '../parking/parking.service';
import IReservation from 'src/interfaces/IReservation';
import { MailService } from '../utils/mail/mail.service';
import { reservationCompleteTemplate } from '../utils/mail/htmlTemplates/reservationComplete.template';

@Injectable()
export class ReservationServiceImpl implements ReservationService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ParkingService) private readonly parkingService: ParkingService,
    @Inject(MailService) private readonly mailService: MailService,
  ) {}

  async createReservation(
    {
      endTime,
      parkingId,
      registrationNumber,
      startTime,
      totalDuration,
    }: CreateReservationDto,
    { email }: IToken,
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
        'We are really sorry, the parking is full at the moment.',
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
        user: { connect: { email } },
      },
    });

    this.mailService.sendEmailMessage({
      to: email,
      html: reservationCompleteTemplate(
        registrationNumber,
        startTime,
        endTime,
        totalDuration,
      ),
      subject: 'Reservation complete',
    });

    return {
      reservation: newReservation,
      message:
        'Reservation created successfully, we have sent you email with the reservation info',
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
