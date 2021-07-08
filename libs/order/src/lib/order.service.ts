import { Injectable, Logger } from '@nestjs/common';
import {Order} from '@prisma/client';
import { PrismaService } from '@wow-spedoo/prisma';
@Injectable()
export class OrderService {

  constructor(private prisma:PrismaService) {
  }

  async addOrder(order:Order){
    try {
      this.prisma.order.create({
        data:order
      })
    }catch(err){
      Logger.log(err);
    }
  }
}
