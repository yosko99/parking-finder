import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VerifyJWT } from 'src/middleware/utils/verifyJWT.middleware';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { ReservationServiceImpl } from './reservation.service.impl';
import { ParkingService } from '../parking/parking.service';
import { ParkingServiceImpl } from '../parking/parking.service.impl';
import { DistanceService } from '../utils/distance.service';
import { DistanceServiceImpl } from '../utils/distance.service.impl';

@Module({
  imports: [],
  controllers: [ReservationController],
  providers: [
    {
      provide: ReservationService,
      useClass: ReservationServiceImpl,
    },
    {
      provide: ParkingService,
      useClass: ParkingServiceImpl,
    },
    {
      provide: DistanceService,
      useClass: DistanceServiceImpl,
    },
    PrismaService,
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
