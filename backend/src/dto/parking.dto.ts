import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import ICoordinate from 'src/interfaces/ICoordinate';

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
  @Min(1)
  parkingSize: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(22)
  @ApiProperty()
  mapZoomLevel: number;

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

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ApiProperty()
  parkingSpaces: ICoordinate[][];
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

export class CreateParkingReviewDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  comment: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty()
  rating: number;
}
