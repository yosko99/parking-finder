import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from 'src/dto/user.dto';
import IToken from 'src/interfaces/IToken';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser({ email, password, name, isCompany }: CreateUserDto) {
    const doesUserExist =
      (await this.prisma.user.findFirst({
        where: { email },
      })) !== null;

    if (doesUserExist) {
      throw new HttpException('Email is already taken', 409);
    }

    const hashedPassword = (await bcrypt.hash(password, 10)) as string;

    const newUser = await this.prisma.user.create({
      data: { email, password: hashedPassword, name, isCompany },
    });

    return {
      message: 'User created successfully',
      token: this.generateToken(newUser.email, newUser.password),
    };
  }

  deleteUser(id: string) {
    throw new Error('Method not implemented.');
  }

  async loginUser({ email, password }: LoginUserDto) {
    const user = await this.retrieveUser({ where: { email } });
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new HttpException('Provided invalid password', 401);
    }

    const token = this.generateToken(user.email, password);

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
      },
    });

    return user;
  }
  getCurrentUserReservations({ email }: IToken) {
    throw new Error('Method not implemented.');
  }
  getCurrentUserParkings({ email }: IToken) {
    throw new Error('Method not implemented.');
  }

  private generateToken(email: string, password: string) {
    const token = jwt.sign({ email, password }, process.env.JSONWEBTOKEN_KEY);

    return token;
  }

  private async retrieveUser(query: Prisma.UserFindUniqueArgs) {
    const user = await this.prisma.user.findUnique(query);

    if (user === null) {
      throw new HttpException('Could not find provided user ', 404);
    }

    return user;
  }
}
