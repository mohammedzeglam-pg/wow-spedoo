import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { ProductStatus } from '@prisma/client';

@Injectable()
export class DeliveryService {
  constructor(private prisma: PrismaService) {}

  async getUnfinishedTasks(take = 10, skip = 0) {
    try {
      return await this.prisma.order.findMany({
        where: {
          products: {
            some: {
              deliveryId: null,
            },
          },
        },
        include: {
          products: true,
          payment: true,
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
      return await this.prisma.delivery.create({
        data: data,
      });
    } catch (err) {
      Logger.log(err);
    }
  }

  async getFinshedTasks(take = 10, skip = 0) {
    try {
      return await this.prisma.order.findMany({
        where: {
          products: {
            every: {
              deliveryId: {
                not: null,
              },
            },
          },
          AND: {
            products: {
              every: {
                status: {
                  equals: ProductStatus.COMPLETED,
                },
              },
            },
          },
        },
        include: {
          products: true,
          payment: true,
        },
        take: take,
        skip: take * skip,
      });
    } catch (err) {
      Logger.log(err);
    }
  }
}
