import { IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class AddPickTaskDto {
  @IsNumber()
  @Type(() => Number)
  pick_boy: number;
  @IsArray()
  @Type(() => Number)
  products: number[];
  @IsNumber()
  @Type(() => Number)
  total_location: number;
  @IsNumber()
  @Type(() => Number)
  total_pieces: number;
}
