import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class AddLocationDto {
  @IsNumber()
  @Type(() => Number)
  lat: number;
  @IsNumber()
  @Type(() => Number)
  lon: number;
  @IsNumber()
  @Type(() => Number)
  zoneId: number;
}
