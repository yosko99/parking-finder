import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(10)
  @IsString()
  @ApiProperty()
  registrationNumber: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  startTime: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  endTime: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  totalDuration: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  parkingId: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  country: string;
}
