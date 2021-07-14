import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateManyProductDto   {
  @IsString()
  name: string
  @Type(()=>Number)
  total_pieces?: number
  dimensions?: string | null
  weight?: string | null
  @IsNumber()
  @Type(()=>Number)
  supplierId: number ;
  readonly times:Date=new Date();
}
