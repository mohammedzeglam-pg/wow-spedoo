import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class AddStreetDto{
  @IsNotEmpty()
  @IsString()
  name:string;
  @IsNotEmpty()
  lat:string;
  @IsNotEmpty()
  lon:string;
  @IsNumber()
  @Type(()=>Number)
  price:number;
  @IsNumber()
  @Type(()=>Number)
  regionId:number;
}
