import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateManyProductDto {
  @IsString()
  name: string;
  @Type(() => Number)
  total_pieces?: number;
  dimensions?: string | null;
  weight?: string | null;
  @IsNumber()
  @Type(() => Number)
  supplierId: number;
  @IsDate()
  readonly times: Date = new Date();
}
