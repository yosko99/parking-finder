import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { CheckExistingUserById } from 'src/middleware/user/checkExistingUserByID.middleware';
import { VerifyJWT } from 'src/middleware/utils/verifyJWT.middleware';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckExistingUserById).forRoutes({
      path: '/users/:id',
      method: RequestMethod.DELETE,
    });

    consumer.apply(VerifyJWT).forRoutes(
      {
        path: '/users/current',
        method: RequestMethod.GET,
      },
      {
        path: '/users/current/dashboard',
        method: RequestMethod.GET,
      },
      {
        path: '/users/current/parkings',
        method: RequestMethod.GET,
      },
      {
        path: '/users/current/reservations',
        method: RequestMethod.GET,
      },
    );
  }
}
