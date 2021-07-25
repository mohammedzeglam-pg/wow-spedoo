import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddZoneDto {
  @IsNumber()
  @Type(() => Number)
  cityId: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @Type(() => Number)
  price: number;
}
export class UpdateZoneDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  cityId?: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price?: number;
}
