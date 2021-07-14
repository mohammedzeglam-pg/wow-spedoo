import {  Injectable} from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';

@Injectable()
export class PaymentService {
  constructor( private readonly prisma:PrismaService) {}


  private readonly payment={
    id:true,
    name:true,
  };


  async addPaymentMethod(name:string){
    return  this.prisma.paymentMethod.create({
      select:{
        ...this.payment,
      },
      data:{
        name:name,
      }
    });
  }


  async getAllPaymentMethod(){
    return  this.prisma.paymentMethod.findMany({
      select:{
        ...this.payment
      }
    });
  }

  async getSpecificPaymentMethod(id:number){
    return  this.prisma.paymentMethod.findFirst({
      select:{
        ...this.payment
      },
      where:{
        id,
      },
    });
  }
}
