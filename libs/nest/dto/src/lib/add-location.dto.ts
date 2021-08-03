import { IsArray, IsNumber, ValidateNested } from 'class-validator';
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
export class AddManyLocationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationArray)
  location: LocationArray[];
  @IsNumber()
  @Type(() => Number)
  zoneId: number;
}
class LocationArray {
  @IsNumber()
  @Type(() => Number)
  lat: number;
  @IsNumber()
  @Type(() => Number)
  lon: number;
}
