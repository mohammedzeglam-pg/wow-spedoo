import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import {  CreateOrderDto  } from '@wow-spedoo/dto';
@Injectable()
export class OrderService {

  constructor(private prisma: PrismaService) {}

  async addOrder(order:CreateOrderDto,token:string) {
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
            token:token,
          },},
        payment:{
          connect:{
            ...payment_method
          },
        },
        products:{
          createMany:{
            data:[...products]
          },
        },
      },
    });
  }

  async getOrderDetails(orderId:number, token:string){
    return this.prisma.order.findFirst({
      select:{
        order_id: true,
        products: {
          select:{
            name:true,
            status:true,
          }
        }
      },
      where: {
        id:orderId,
        AND:{
          partner:{
            is: {
              token:token
            },
          },
        }
      },
    });
  }





}
