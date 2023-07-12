import { CreateUserDto, LoginUserDto } from 'src/dto/user.dto';
import IToken from 'src/interfaces/IToken';

export interface UserService {
  createUser(createUserDto: CreateUserDto);

  deleteUser(id: string);

  loginUser({ email, password }: LoginUserDto);

  getCurrentUser({ email }: IToken);

  getCurrentUserReservations({ email }: IToken);

  getCurrentUserParkings({ email }: IToken);
}

export const UserService = Symbol('UserService');
