import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateManyProductDto } from './create-many-product.dto';
export class CreateOrderDto{

  @IsNumber()
  @Type(()=>Number)
  order_id:number;
  products:CreateManyProductDto[];
  @IsNumber()
  @Type(()=>Number)
  total_pieces:number;
  recipient:string;
  @IsNumber()
  @Type(()=>Number)
  total_price:number;
  @IsNumber()
  @Type(()=>Number)
  @IsNumber()
  @Type(()=>Number)
  payment_method:number;
  latitude:string;
  longitude:string;
}
