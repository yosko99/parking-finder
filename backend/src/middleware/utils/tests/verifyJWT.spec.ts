import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

import { VerifyJWT } from '../verifyJWT.middleware';

describe('test VerifyJWT middleware', () => {
  const middleware: VerifyJWT = new VerifyJWT();
  const mockNext: NextFunction = jest.fn();

  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  it('should return 401 if no token is provided', async () => {
    await middleware.use(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'No token provided' });
  });

  it('should return 498 if an invalid token is provided', async () => {
    const tokenHeader = 'Bearer invalid-token';
    mockReq = {
      headers: {
        authorization: tokenHeader,
      },
    };

    await middleware.use(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(498);
    expect(mockRes.send).toHaveBeenCalled();
  });

  it('should set userDataFromToken on the request object if a valid token is provided', async () => {
    const validToken = jwt.sign(
      { id: 'user-id' },
      process.env.JSONWEBTOKEN_KEY,
    );

    const tokenHeader = `Bearer ${validToken}`;

    mockReq = {
      headers: {
        authorization: tokenHeader,
      },
    };

    await middleware.use(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});
