import { Test } from '@nestjs/testing';
import { NextFunction, Request, Response } from 'express';

import { CheckExistingUserById } from '../checkExistingUserByID.middleware';

import IUser from '../../../interfaces/IUser';
import { PrismaService } from '../../../modules/prisma/prisma.service';

describe('test checkExistingUserById middleware', () => {
  let middleware: CheckExistingUserById;
  let mockPrismaService: PrismaService;

  let mockRequest: Request & { user: IUser };
  let mockResponse: Response;
  let mockNextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      params: { id: '1' },
    } as unknown as Request & { user: IUser };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    mockNextFunction = jest.fn();
  });

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CheckExistingUserById,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    middleware = moduleRef.get<CheckExistingUserById>(CheckExistingUserById);

    mockPrismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when the user exists', () => {
    const mockUser = {} as any;

    beforeEach(async () => {
      jest
        .spyOn(mockPrismaService.user, 'findUnique')
        .mockResolvedValueOnce(mockUser);

      await middleware.use(mockRequest, mockResponse, mockNextFunction);
    });

    it('should set the user on the request object', () => {
      expect(mockRequest.user).toEqual(mockUser);
    });

    it('should call next', () => {
      expect(mockNextFunction).toHaveBeenCalled();
    });

    it('should not send a response', () => {
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.send).not.toHaveBeenCalled();
    });
  });

  describe('when the user does not exist', () => {
    beforeEach(async () => {
      jest
        .spyOn(mockPrismaService.user, 'findUnique')
        .mockResolvedValueOnce(null);

      await middleware.use(mockRequest, mockResponse, mockNextFunction);
    });

    it('should not set the user on the request object', () => {
      expect(mockRequest.user).toBeUndefined();
    });

    it('should not call next', () => {
      expect(mockNextFunction).not.toHaveBeenCalled();
    });

    it('should send a 404 response', () => {
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'Could not find user with provided ID',
      });
    });
  });
});
