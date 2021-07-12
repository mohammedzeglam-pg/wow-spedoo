import { IsNumber } from 'class-validator';
import {  Type } from 'class-transformer';

export class PaginationDto{


  @IsNumber()
  @Type(()=>Number)
  readonly take:number = 10;
  @IsNumber()
  @Type(()=>Number)
  readonly skip:number = 0;
}
