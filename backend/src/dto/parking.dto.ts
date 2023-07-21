import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateParkingDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  address: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  hourlyPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  parkingSize: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @ApiProperty({ maximum: 90, minimum: -90 })
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @ApiProperty({ maximum: 180, minimum: -180 })
  lng: number;
}

export class ParkingsWithinRangeDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ maximum: 90, minimum: -90 })
  lat: number;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ maximum: 180, minimum: -180 })
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
