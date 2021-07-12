import {  Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';

@Injectable()
export class PaymentService {
  constructor( private readonly prisma:PrismaService) {}


  private readonly payment={
    id:true,
    name:true,
  };


  async addPaymentMethod(name:string){
    try{
      return  this.prisma.paymentMethod.create({
        select:{
          ...this.payment,
        },
        data:{
          name:name,
        }
      });
    } catch(err){
      Logger.warn(err);
    }
  }


  async getAllPaymentMethod(){
    try{
      return  this.prisma.paymentMethod.findMany({
        select:{
          ...this.payment
        }
      });
    }catch(err){
      Logger.warn(err);
    }
  }

  async getSpecificPaymentMethod(id:number){
    try{
      return  this.prisma.paymentMethod.findFirst({
        select:{
          ...this.payment
        },
        where:{
          id,
        },
      });
    }catch(err){
      Logger.warn(err);
    }
  }
}
