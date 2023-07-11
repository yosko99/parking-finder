import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty({ minLength: 3 })
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty({ minLength: 8 })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty({ minLength: 8 })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
