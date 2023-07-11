import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { UserServiceImpl } from './user.service.impl';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CheckExistingUserById } from 'src/middleware/user/checkExistingUserByID.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: UserService,
      useClass: UserServiceImpl,
    },
    PrismaService,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckExistingUserById).forRoutes({
      path: '/users/:id',
      method: RequestMethod.DELETE,
    });
  }
}
