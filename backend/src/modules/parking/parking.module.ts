import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ParkingController } from './parking.controller';
import { VerifyJWT } from 'src/middleware/utils/verifyJWT.middleware';
import { ParkingService } from './parking.service';
import { DistanceService } from '../utils/distance/distance.service';

@Module({
  imports: [],
  controllers: [ParkingController],
  providers: [ParkingService, PrismaService, DistanceService],
})
export class ParkingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes(
      {
        path: '/parkings',
        method: RequestMethod.POST,
      },
      {
        path: '/parkings/:id/reviews',
        method: RequestMethod.POST,
      },
      {
        path: '/parkings/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: '/parkings',
        method: RequestMethod.GET,
      },
    );
  }
}
