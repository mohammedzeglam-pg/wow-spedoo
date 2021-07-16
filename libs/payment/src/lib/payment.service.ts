import {  Injectable} from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { AddPaymentDto, PaymentMethodDto } from '@wow-spedoo/dto';

@Injectable()
export class PaymentService {
  constructor( private readonly prisma:PrismaService) {}
  private readonly payment={
    id:true,
    name:true,
    is_take:true
  };
  async addPaymentMethod(addPaymentDto:AddPaymentDto){
    return  this.prisma.paymentMethod.create({
      select: this.payment,
      data:addPaymentDto,
    });
  }
  async getAllPaymentMethod(){
    return  this.prisma.paymentMethod.findMany({
      select: this.payment
    });
  }
  async getSpecificPaymentMethod(paymentMethodDto:PaymentMethodDto){
    return  this.prisma.paymentMethod.findFirst({
      select:this.payment,
      where:paymentMethodDto,
    });
  }


  async updatePaymentMethod(paymentMethodDto:PaymentMethodDto,addPaymentDto:AddPaymentDto){
    return this.prisma.paymentMethod.update({
      data:addPaymentDto,
      where:paymentMethodDto,
    });
  }
}
