import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { DeliveryStatus } from '@prisma/client';

@Injectable()
export class DeliveryBoyService {

  constructor(private readonly prisma: PrismaService) {}

  getUnCompletedTasks(take = 10, skip = 0) {
    return this.getTasksFromStatus(take,skip,DeliveryStatus.UNDER_DELIVERING);
  }

  // get it from token
  getCompletedTasks(take, skip) {
    return this.getTasksFromStatus(take,skip,DeliveryStatus.COMPLETED);
  }

  getCanceledTasks(take:number,skip:number){
    return this.getTasksFromStatus(take,skip,DeliveryStatus.CANCELED);
  }
  //TODO: get it return the basic info about product
  // get it from token
  private getTasksFromStatus(take=10, skip=0,status:DeliveryStatus){
    try {
      return this.prisma.deliveryBoy.findMany({
        where: {
          delivery: {
            every: {
              status: status,
            },
          },
        },
        take: take,
        skip: skip * take,
      });
    } catch (err) {
      Logger.log(err);
      return { message: 'Unhandled problem' };
    }
  }



  //TODO: add update status
  // remember the time table

}
