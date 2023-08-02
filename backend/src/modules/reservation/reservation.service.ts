import { HttpException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from 'src/dto/reservation.dto';
import IToken from 'src/interfaces/IToken';
import { reservationCompleteTemplate } from '../utils/mail/htmlTemplates/reservationComplete.template';
import { MailService } from '../utils/mail/mail.service';
import { ParkingService } from '../parking/parking.service';
import getNumberOfOverlappingReservations from 'src/functions/getNumberOfOverlappingReservations';
import IParking from 'src/interfaces/IParking';

@Injectable()
export class ReservationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly parkingService: ParkingService,
    private readonly mailService: MailService,
  ) {}

  private readonly logger = new Logger(ReservationService.name);

  async createReservation(
    {
      endTime,
      parkingId,
      registrationNumber,
      startTime,
      totalDuration,
      country,
      totalPrice,
      parkingSpaceId,
    }: CreateReservationDto,
    { email }: IToken,
  ) {
    this.logger.log(`Creating reservation for (${registrationNumber})`);

    await this.parkingService.retrieveParkingSpaceById(parkingSpaceId);
    const parking = await this.parkingService.retrieveParkingById(parkingId, {
      reservations: true,
    });

    if (new Date(startTime) > new Date(endTime)) {
      this.logger.error('End date cannot be before start date!');
      throw new HttpException('End date cannot be before start date!', 400);
    }

    this.checkIsParkingFull(startTime, endTime, parking);

    const newReservation = await this.prisma.reservation.create({
      data: {
        startTime,
        endTime,
        parkingSpace: { connect: { id: parkingSpaceId } },
        registrationNumber,
        totalDuration,
        country,
        totalPrice,
        parking: { connect: { id: parking.id } },
        user: { connect: { email } },
      },
    });
    this.logger.log(`Reservation for (${registrationNumber}) created`);

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
    this.logger.log('Email for reservation sent');

    return {
      reservation: newReservation,
      message:
        'Reservation created successfully, we have sent you email with the reservation info',
    };
  }

  private checkIsParkingFull(
    startTime: string,
    endTime: string,
    parking: IParking,
  ) {
    const { collisionCount } = getNumberOfOverlappingReservations(
      startTime,
      endTime,
      parking.reservations,
    );

    if (collisionCount >= parking.parkingSize) {
      this.logger.error('Parking is full of capacity');
      throw new HttpException(
        'We are really sorry, the parking is full at the moment.',
        503,
      );
    }
  }
}
