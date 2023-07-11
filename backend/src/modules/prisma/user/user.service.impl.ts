import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from 'src/dto/user.dto';
import IToken from 'src/interfaces/IToken';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(private readonly prisma: PrismaService) {}

  createUser(createUserDto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: string) {
    throw new Error('Method not implemented.');
  }
  loginUser({ email, password }: LoginUserDto) {
    throw new Error('Method not implemented.');
  }
  getCurrentUser({ username }: IToken) {
    throw new Error('Method not implemented.');
  }
  getCurrentUserReservations({ username }: IToken) {
    throw new Error('Method not implemented.');
  }
  getCurrentUserParkings({ username }: IToken) {
    throw new Error('Method not implemented.');
  }
}
