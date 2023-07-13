import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { ParkingServiceImpl } from './parking.service.impl';
import { VerifyJWT } from 'src/middleware/utils/verifyJWT.middleware';
import { DistanceService } from '../utils/distance.service';
import { DistanceServiceImpl } from '../utils/distance.service.impl';

@Module({
  imports: [],
  controllers: [ParkingController],
  providers: [
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
export class ParkingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes({
      path: '/parkings',
      method: RequestMethod.POST,
    });
  }
}
