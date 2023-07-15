import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from 'src/dto/reservation.dto';
import IToken from 'src/interfaces/IToken';
import { reservationCompleteTemplate } from '../utils/mail/htmlTemplates/reservationComplete.template';
import { MailService } from '../utils/mail/mail.service';
import { ParkingService } from '../parking/parking.service';
import getNumberOfOverlappingReservations from 'src/functions/getNumberOfOverlappingReservations';

@Injectable()
export class ReservationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly parkingService: ParkingService,
    private readonly mailService: MailService,
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
      getNumberOfOverlappingReservations(
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
}
