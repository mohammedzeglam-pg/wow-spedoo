import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRegionDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(()=>Number)
  cityId:number;
  @IsString()
  @IsNotEmpty()
  name:string;
}
