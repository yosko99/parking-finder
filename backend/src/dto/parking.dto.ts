import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateParkingDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ minLength: 3 })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ minLength: 3 })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ minLength: 3 })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  hourlyPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  parkingSize: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ maximum: 90, minimum: -90 })
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @ApiProperty({ maximum: 90, minimum: -90 })
  lng: number;
}

export class ParkingsWithinRangeDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ maximum: 90, minimum: -90 })
  lat: number;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ maximum: 90, minimum: -90 })
  lng: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  startTime: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  endTime: string;
}

export class ParkingFreeSpacesDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  startTime: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  endTime: string;
}
