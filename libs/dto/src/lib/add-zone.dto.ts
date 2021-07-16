import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddZoneDto{
  @IsNumber()
  @Type(()=>Number)
  cityId:number;
  @IsString()
  @IsNotEmpty()
  name:string;
  @IsNumber()
  @Type(()=>Number)
  price:number
}
