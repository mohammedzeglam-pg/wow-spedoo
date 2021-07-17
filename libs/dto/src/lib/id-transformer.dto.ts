import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class IdTransformerDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
