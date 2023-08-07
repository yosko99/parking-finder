import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
} from 'class-validator';

export class GeocodeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ minLength: 3, type: 'string' })
  address: string;
}

export class ReverseGeocodeDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ maximum: 90, minimum: -90 })
  lat: number;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ maximum: 180, minimum: -180 })
  lng: number;
}
