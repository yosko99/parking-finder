import { CreateUserDto, LoginUserDto } from 'src/dto/user.dto';
import IToken from 'src/interfaces/IToken';

export interface UserService {
  createUser(createUserDto: CreateUserDto);

  deleteUser(id: string);

  loginUser({ email, password }: LoginUserDto);

  getCurrentUser({ username }: IToken);

  getCurrentUserReservations({ username }: IToken);

  getCurrentUserParkings({ username }: IToken);
}

export const UserService = Symbol('UserService');
