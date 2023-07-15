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
import { DistanceModule } from '../utils/distance/distance.module';
import { MailModule } from '../utils/mail/mail.module';

@Module({
  imports: [DistanceModule, MailModule],
  controllers: [ReservationController],
  providers: [ReservationService, PrismaService, ParkingService],
})
export class ReservationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes({
      path: '/reservations',
      method: RequestMethod.POST,
    });
  }
}
