import { HttpException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserDto,
  LoginUserDto,
  UserDashboardDto,
} from 'src/dto/user.dto';
import IToken from 'src/interfaces/IToken';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';
import IUser from 'src/interfaces/IUser';
import getReservationDashboardInformation from 'src/functions/getReservationDashboardInformation';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(UserService.name);

  async createUser({ email, password, name, isCompany }: CreateUserDto) {
    this.logger.log(`Creating user with email (${email})`);

    const doesUserExist =
      (await this.prisma.user.findFirst({
        where: { email },
      })) !== null;

    if (doesUserExist) {
      this.logger.error(`User with email (${email}) already exists`);
      throw new HttpException('Email is already taken', 409);
    }

    const hashedPassword = (await bcrypt.hash(password, 10)) as string;

    const newUser = await this.prisma.user.create({
      data: { email, password: hashedPassword, name, isCompany },
    });

    this.logger.log('User created');
    return {
      message: 'User created successfully',
      token: this.generateToken(newUser.email, newUser.password),
    };
  }

  deleteUser(id: string) {
    throw new Error('Method not implemented.');
  }

  async loginUser({ email, password }: LoginUserDto) {
    this.logger.log(`User with email (${email}) is logging in`);

    const user = await this.retrieveUser({ where: { email } });
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) {
      this.logger.error(`User with email (${email}) got password mismatch`);
      throw new HttpException('Provided invalid password', 401);
    }

    const token = this.generateToken(user.email, password);
    this.logger.log(`User with email (${email}) logged in`);

    return {
      message: 'Logged in successfully',
      token,
    };
  }

  async getCurrentUser({ email }: IToken) {
    const user = await this.retrieveUser({
      where: { email },
      select: {
        isCompany: true,
        name: true,
        email: true,
      },
    });

    return user;
  }

  async getCurrentUserDashboard(
    { timeRange, parkingTitle }: UserDashboardDto,
    { email }: IToken,
  ) {
    this.logger.log(
      `Fetching dashboard information of user with email (${email})`,
    );

    const currentUser = await this.retrieveUserWithDashboardInfo(
      email,
      parkingTitle,
    );

    this.checkIsUserCompany(currentUser);

    const {
      reservations = [],
      hourlyPrice = 0,
      parkingSize = 0,
    } = currentUser.ownedParkings[0] || {};

    return getReservationDashboardInformation(
      reservations,
      hourlyPrice,
      timeRange,
      parkingSize,
    );
  }

  async getCurrentUserReservations({ email }: IToken) {
    const user = (await this.retrieveUser({
      where: { email },
      select: {
        reservations: {
          select: {
            registrationNumber: true,
            totalPrice: true,
            startTime: true,
            endTime: true,
            totalDuration: true,
            isActive: true,
          },
        },
      },
    })) as unknown as IUser;

    return user.reservations;
  }

  async getCurrentUserParkings({ email }: IToken) {
    this.logger.log(`Fetching current user (${email}) parkings`);
    const user = (await this.retrieveUser({
      where: { email },
      select: { ownedParkings: true, isCompany: true, email: true },
    })) as unknown as IUser;

    this.checkIsUserCompany(user);
    return user.ownedParkings;
  }

  private generateToken(email: string, password: string) {
    const token = jwt.sign({ email, password }, process.env.JSONWEBTOKEN_KEY);

    return token;
  }

  private async retrieveUser(query: Prisma.UserFindUniqueArgs) {
    this.logger.log('Fetching user');

    const user = await this.prisma.user.findUnique(query);

    if (user === null) {
      this.logger.error('User could not be found');
      throw new HttpException('Could not find provided user ', 404);
    }

    return user;
  }

  private async retrieveUserWithDashboardInfo(email, parkingTitle) {
    const currentUser = await this.retrieveUser({
      where: { email },
      select: {
        ownedParkings: {
          where: { title: parkingTitle },
          select: {
            reservations: {
              select: {
                startTime: true,
                endTime: true,
                country: true,
                totalDuration: true,
                totalPrice: true,
                isActive: true,
                registrationNumber: true,
                user: {
                  select: { name: true },
                },
              },
            },
            parkingSize: true,
            hourlyPrice: true,
          },
        },
        isCompany: true,
      },
    });

    return currentUser as unknown as IUser;
  }

  private checkIsUserCompany(user: IUser) {
    if (!user.isCompany) {
      this.logger.error(
        `User with email (${user.email}) does not have access to company account functionality`,
      );
      throw new HttpException(
        'Sorry your account does not have the access to this functionality',
        401,
      );
    }
  }
}
