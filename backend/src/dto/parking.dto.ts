import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

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
