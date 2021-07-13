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
      lat,
      lon,
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
          lat:lat,
          lon:lon,
          partner:{connect:{
           id:partner,
            },},
          payment:{
            connect:{
              ...payment_method
            },
          },
          products:{
            createMany:{
              data: {...products,times:{
                  set:new Date()
                },
              },
            },
          },
        },
      });
    }catch(err){
      Logger.log(err);
    }
  }

//change all that to use partnerId
  async getOrderDetails(orderId:number, partnerId:number){
    try{
      return this.prisma.order.findFirst({
        where: {
          id:orderId,
          AND:{
            partnerId:partnerId,
          }
        },
      });
    }catch(err){
      Logger.log(err);
    }
  }



}
