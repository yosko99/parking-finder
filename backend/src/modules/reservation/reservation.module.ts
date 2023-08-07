import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VerifyJWT } from 'src/middleware/utils/verifyJWT.middleware';
import { ReservationController } from './reservation.controller';
import { ParkingService } from '../parking/parking.service';
import { ReservationService } from './reservation.service';
import { MailService } from '../utils/mail/mail.service';
import { DistanceService } from '../utils/distance/distance.service';

@Module({
  imports: [],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    PrismaService,
    ParkingService,
    MailService,
    DistanceService,
  ],
})
export class ReservationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes({
      path: '/reservations',
      method: RequestMethod.POST,
    });
  }
}
