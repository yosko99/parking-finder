import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import TimeFrameEnum from 'src/enums/TimeFrameEnum';

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

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isCompany: boolean;
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

export class UserDashboardDto {
  @IsNotEmpty()
  @IsEnum(TimeFrameEnum)
  @ApiProperty({ enum: TimeFrameEnum, required: true })
  timeRange: TimeFrameEnum;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  parkingTitle: string;
}

export class UserParkingsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  parkingTitle: string;
}
