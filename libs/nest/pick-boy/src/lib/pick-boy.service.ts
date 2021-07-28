import { Injectable } from '@nestjs/common';
import { NestPrismaService } from '@wow-spedoo/nest/prisma';
import { ProductStatus } from '@prisma/client';
import { NestPickStatus } from '@wow-spedoo/nest/dto';
@Injectable()
export class NestPickBoyService {
  constructor(private readonly prisma: NestPrismaService) {}

  async getUnfinishedTasks(id: number, { take = 10, skip = 0 }) {
    return this.fetchProducts(id, ProductStatus.UNDER_PICKING, take, skip);
  }

  async getFinishedTasks(id: number, { take = 10, skip = 0 }) {
    return this.fetchProducts(id, ProductStatus.PICKED, take, skip);
  }

  async updateTaskStatus(
    id: number,
    data: { status: NestPickStatus; note: string },
    productId: number,
  ) {
    const check = await this.checkProduct(id, productId);
    const checkStatus = await this.checkStatus(productId);
    if (!check || !checkStatus) {
      return null;
    }
    return this.prisma.product.update({
      data: {
        ...data,
        times: {
          push: new Date(),
        },
      },
      where: {
        id: productId,
      },
    });
  }

  private async fetchProducts(
    id: number,
    status: ProductStatus,
    take = 10,
    skip = 0,
  ) {
    return this.prisma.pick.findMany({
      where: {
        pick_boyId: id,
        AND: {
          products: {
            some: {
              status: status,
            },
          },
        },
      },
      select: {
        products: {
          // where:{
          //   status:status,
          // },
          select: {
            id: true,
            name: true,
            total_pieces: true,
            supplier: {
              select: {
                id: true,
                name: true,
                phone: true,
                lat: true,
                lon: true,
              },
            },
          },
          take: take,
          skip: take * skip,
        },
      },
    });
  }

  private async checkStatus(prodId: number) {
    return this.prisma.product.findFirst({
      where: {
        id: prodId,
        AND: {
          status: {
            in: ['UNDER_PICKING', 'CANCELED'],
          },
        },
      },
    });
  }
  private async checkProduct(id: number, productId: number) {
    return this.prisma.pickBoy.findFirst({
      select: {
        id: true,
      },
      where: {
        id: id,
        AND: {
          pick: {
            some: {
              products: {
                some: {
                  id: productId,
                },
              },
            },
          },
        },
      },
    });
  }
}
