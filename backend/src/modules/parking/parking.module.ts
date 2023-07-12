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

@Module({
  imports: [],
  controllers: [ParkingController],
  providers: [
    {
      provide: ParkingService,
      useClass: ParkingServiceImpl,
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
