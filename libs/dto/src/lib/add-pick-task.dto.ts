import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export class AddPickTaskDto{
  @IsNumber()
  @Type(()=>Number)
  pick_boy:number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(()=>Number)
  products:number[];
}
