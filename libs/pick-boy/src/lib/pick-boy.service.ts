import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import {PickStatus} from '@prisma/client';

@Injectable()
export class PickBoyService {
  constructor(private readonly prisma: PrismaService) {}

  getUnCompletedTasks(take = 10, skip = 0) {
    return this.getTasksFromStatus(take,skip,PickStatus.UNDER_PICKING);
  }

  // get it from token
  getCompletedTasks(take, skip) {
    return this.getTasksFromStatus(take,skip,PickStatus.COMPLETED);
  }

  getCanceledTasks(take:number,skip:number){
    return this.getTasksFromStatus(take,skip,PickStatus.CANCELED);
  }

  //TODO: get it return the basic info about product
  // get it from token
  private getTasksFromStatus(take=10, skip=0,status:PickStatus){
    try {
      return this.prisma.pickBoy.findMany({
        where: {
          pick: {
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
}

