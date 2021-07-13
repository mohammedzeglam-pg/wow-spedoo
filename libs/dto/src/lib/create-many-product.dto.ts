import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import {ProductStatus} from 'prisma';
export class CreateManyProductDto   {
  @IsString()
  name: string
  @Type(()=>Number)
  total_pieces?: number
  dimensions?: string | null
  weight?: string | null
  @Type(()=>Number)
  supplierId: number ;
  status:ProductStatus;
}
