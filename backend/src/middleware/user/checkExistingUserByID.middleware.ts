import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import IUser from '../../interfaces/IUser';
import { PrismaService } from '../../modules/prisma/prisma.service';

type ExtendedRequest = Request & { user: IUser };

@Injectable()
export class CheckExistingUserById implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { id } = req.params;

    const user = (await this.prisma.user.findUnique({
      where: { id },
    })) as unknown as IUser;

    if (user === null) {
      return res.status(404).send({
        message: 'Could not find user with provided ID',
      });
    }

    req.user = user;

    next();
  }
}
