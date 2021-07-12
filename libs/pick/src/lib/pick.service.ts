import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { ProductStatus } from '@prisma/client';
@Injectable()
export class PickService {
  constructor(private prisma: PrismaService) {}

  async getUnfinshedTasks(take = 10, skip = 0) {
    try {
      return await this.prisma.product.findMany({
        where: {
          status: ProductStatus.UNDER_REVIEW,
        },
      });
    } catch (err) {
      Logger.log(err);
    }
  }

  async getFinishedTasks(take = 10, skip = 0) {
    try {
      return await this.prisma.product.findMany({
        where: {
          status: ProductStatus.APPROVED,
        },
        take: take,
        skip: take * skip,
      });
    } catch (err) {
      Logger.log(err);
    }
  }

  async addNewTask(data) {
    try {
      return await this.prisma.pick.create({
        data: data,
      });
    } catch (err) {
      Logger.log(err);
    }
  }
}
