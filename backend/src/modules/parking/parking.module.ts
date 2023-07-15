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
import { DistanceModule } from '../utils/distance/distance.module';

@Module({
  imports: [DistanceModule],
  controllers: [ParkingController],
  providers: [ParkingService, PrismaService],
})
export class ParkingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes({
      path: '/parkings',
      method: RequestMethod.POST,
    });
  }
}
