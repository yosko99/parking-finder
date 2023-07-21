import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VerifyJWT } from 'src/middleware/utils/verifyJWT.middleware';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { HttpModule } from '@nestjs/axios';
import { CacheService } from '../cache/cache.service';

@Module({
  imports: [HttpModule],
  controllers: [GoogleController],
  providers: [GoogleService, PrismaService, CacheService],
})
export class GoogleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes({
      path: '/parkings',
      method: RequestMethod.POST,
    });
  }
}
