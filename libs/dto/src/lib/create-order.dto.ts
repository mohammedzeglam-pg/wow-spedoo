import { IsArray, IsDefined, IsNotEmptyObject, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateManyProductDto } from './create-many-product.dto';
import { PaymentMethodDto } from './payment-method.dto';


export class CreateOrderDto{

  @IsNumber()
  @Type(()=>Number)
  order_id:number;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateManyProductDto)
  products:CreateManyProductDto[];
  @IsNumber()
  @Type(()=>Number)
  total_pieces:number;
  recipient:string;
  @IsNumber()
  @Type(()=>Number)
  total_price:number;
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => PaymentMethodDto)
  payment_method:PaymentMethodDto;
  lat:string;
  lon:string;
}
