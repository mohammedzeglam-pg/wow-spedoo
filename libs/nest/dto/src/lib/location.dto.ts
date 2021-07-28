import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class LocationDto {
  @IsNumber()
  @Type(() => Number)
  lat: number;
  @IsNumber()
  @Type(() => Number)
  lon: number;
}
