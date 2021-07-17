import { Type } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

export class AddDeliveryTaskDto {
  @IsNumber()
  @Type(() => Number)
  total_location: number;
  @IsNumber()
  @Type(() => Number)
  total_pieces: number;
  @IsNumber()
  @Type(() => Number)
  delivery_boy: number;
  @IsArray()
  @Type(() => Number)
  orders: number[];
}
