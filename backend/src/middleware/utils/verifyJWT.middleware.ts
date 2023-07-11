import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import IToken from 'src/interfaces/IToken';

type ExtendedRequest = Request & {
  userDataFromToken?: IToken;
};

@Injectable()
export class VerifyJWT implements NestMiddleware {
  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const tokenHeader = req.headers?.authorization;

    if (tokenHeader === undefined) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = tokenHeader && tokenHeader.split(' ')[1];

    if (token === null) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JSONWEBTOKEN_KEY, (err, data) => {
      if (err) {
        return res.status(498).send(err);
      }

      req.userDataFromToken = data;
      next();
    });
  }
}
