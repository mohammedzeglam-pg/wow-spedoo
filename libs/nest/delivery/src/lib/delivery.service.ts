import { Injectable } from '@nestjs/common';
import { NestPrismaService } from '@wow-spedoo/nest/prisma';

@Injectable()
export class NestDeliveryService {
  constructor(private prisma: NestPrismaService) {}

  async addTask({ total_location, total_pieces, orders, delivery_boy }) {
    // init
    let id: { id: number } = { id: 0 };
    for (let i = 0; i < orders.length; i++) {
      if (i === 0) {
        id = await this.prisma.delivery.create({
          select: { id: true },
          data: {
            total_location: total_location,
            total_pieces: total_pieces,
            delivery_boy: {
              connect: {
                id: delivery_boy,
              },
            },
            orders: {
              connect: {
                id: orders[i],
              },
            },
          },
        });
      } else {
        await this.prisma.delivery.update({
          where: {
            id: id.id,
          },
          data: {
            orders: {
              connect: orders[i],
            },
          },
        });
      }
      await this.prisma.order.update({
        where: {
          id: orders[i],
        },
        data: {
          products: {
            updateMany: {
              where: {
                orderId: orders[i],
                AND: {
                  status: 'FILTRATION',
                },
              },
              data: {
                status: 'UNDER_DELIVERING',
                times: {
                  push: new Date(),
                },
              },
            },
          },
        },
      });
    }
    return id;
  }

  async getUnfinishedTasks(paginationDto: { take: number; skip: number }) {
    return this.fetchTasks('UNDER_DELIVERING', paginationDto);
  }

  async getFinishedTasks(paginationDto: { take: number; skip: number }) {
    return this.fetchTasks('DELIVERED', paginationDto);
  }

  private async fetchTasks(productStatus, { take = 10, skip = 0 }) {
    return this.prisma.product.findMany({
      where: {
        status: productStatus,
      },
      take: take,
      skip: take * skip,
    });
  }
}
