import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { ProductStatus } from '@prisma/client';
@Injectable()
export class DeliveryBoyService {
  constructor(private readonly prisma: PrismaService) {}

  //TODO:get id from token
  async getUnfinshedTasks(take = 10, skip = 0) {
    return this.fetchTasks(ProductStatus.UNDER_DELIVERING, take, skip);
  }
  async getFinshedTasks(take = 10, skip = 0) {
    return this.fetchTasks(ProductStatus.COMPLETED, take, skip);
  }
  async updateTask(status: ProductStatus, productId: number) {
    try {
      return await this.prisma.product.update({
        data: {
          status: status,
        },
        where: {
          id: productId,
        },
      });
    } catch (err) {
      Logger.log(err);
    }
  }
  private async fetchTasks(status: ProductStatus, take = 10, skip = 0) {
    try {
      return await this.prisma.deliveryBoy.findMany({
        where: {
          delivery: {
            every: {
              products: {
                every: {
                  status: status,
                },
              },
            },
          },
        },
        take: take,
        skip: skip * take,
      });
    } catch (err) {
      Logger.log(err);
    }
  }
}
