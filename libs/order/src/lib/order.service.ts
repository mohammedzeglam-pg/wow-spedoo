import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import {  CreateOrderDto  } from '@wow-spedoo/dto';
@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async addOrder(order:CreateOrderDto,partner:number) {
    const {
      order_id,
      total_pieces,
      recipient,
      total_price,
      latitude,
      longitude,
      products,
      payment_method,
    } = order;
    try{
      return this.prisma.order.create({
        select:{id:true},
        data: {
          order_id:order_id,
          total_pieces:total_pieces,
          recipient:recipient,
          total_price:total_price,
          latitude:latitude,
          longitude:longitude,
          partnerId:partner,
          payment_method:payment_method,
          products:{
            createMany:{
              data: products
            },
          },
        },
      });
    }catch(err){
      Logger.log(err);
    }
  }

//change alll that to use partnerId
  async getOrderDetials(orderId:number,partnerId:number){
    try{
      return this.prisma.order.findFirst({
        where: {
          id:orderId,
          AND:{
            partnerId:partnerId,
          }
        },
      })
    }catch(err){
      Logger.log(err);
    }
  }

  //TODO:add
  // async getPrice()

}
