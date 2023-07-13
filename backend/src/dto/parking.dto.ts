import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateParkingDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty({ minLength: 3 })
  title: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty({ minLength: 3 })
  address: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty({ minLength: 3 })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  hourlyPrice: number;

  @IsNotEmpty()
  @IsNumber()
  parkingSize: number;

  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;
}

export class ParkingsWithinRangeDto {
  @IsNotEmpty()
  @IsNumberString()
  lat: number;

  @IsNotEmpty()
  @IsNumberString()
  lng: number;

  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @IsNotEmpty()
  @IsDateString()
  endTime: Date;
}
