import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  UserDashboardDto,
  CreateUserDto,
  LoginUserDto,
} from 'src/dto/user.dto';
import IToken from 'src/interfaces/IToken';
import { RequestData } from 'src/decorators/requestData.decorator';
import { UserService } from './user.service';

@Controller('/users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/current')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Get current user profile data by token' })
  @ApiResponse({ status: 200, description: 'Receive user data' })
  @ApiResponse({ status: 404, description: 'Non existent user' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  getCurrentUser(@RequestData('userDataFromToken') tokenData: IToken) {
    return this.userService.getCurrentUser(tokenData);
  }

  @Get('/current/parkings')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Get current user parkings' })
  @ApiResponse({ status: 200, description: 'Receive user parkings' })
  @ApiResponse({ status: 404, description: 'Non existent user' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 401, description: 'User is not "company"' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  @UsePipes(ValidationPipe)
  getCurrentUserParkings(@RequestData('userDataFromToken') tokenData: IToken) {
    return this.userService.getCurrentUserParkings(tokenData);
  }

  @Get('/current/dashboard')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Get current user dashboard' })
  @ApiResponse({ status: 200, description: 'Receive dashboard information' })
  @ApiResponse({ status: 404, description: 'Non existent user' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 401, description: 'User is not "company"' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  @UsePipes(ValidationPipe)
  getCurrentUserDashboard(
    @RequestData('userDataFromToken') tokenData: IToken,
    @Query() userDashboardDto: UserDashboardDto,
  ) {
    return this.userService.getCurrentUserDashboard(
      userDashboardDto,
      tokenData,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Invalid/missing fields' })
  @ApiResponse({ status: 409, description: 'Name or email is already taken' })
  @ApiResponse({ status: 400, description: 'Invalid or missing fields' })
  @UsePipes(ValidationPipe)
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'Logged in successfully' })
  @ApiResponse({ status: 400, description: 'Invalid/missing fields' })
  @ApiResponse({ status: 404, description: 'Non existent email' })
  @ApiResponse({ status: 401, description: 'Password mismatch' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
