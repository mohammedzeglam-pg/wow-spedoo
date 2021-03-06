import { Injectable } from '@nestjs/common';
import { NestPrismaService } from '@wow-spedoo/nest/prisma';
import { NestDeliveryStatus } from '@wow-spedoo/nest/dto';
@Injectable()
export class NestDeliveryBoyService {
  constructor(private readonly prisma: NestPrismaService) {}

  async getUnfinshedTasks(
    id: number,
    pagination: { take: number; skip: number },
  ) {
    return this.fetchTasks(id, 'UNDER_DELIVERING', pagination);
  }

  async getFinishedTasks(
    id: number,
    pagination: { take: number; skip: number },
  ) {
    return this.fetchTasks(id, 'DELIVERED', pagination);
  }

  async updateTask(
    id: number,
    {
      status,
      note,
      orderId,
    }: { status: NestDeliveryStatus; note?: string; orderId: number },
  ) {
    return this.prisma.product.updateMany({
      data: {
        status: status,
        note: note,
      },
      where: {
        order: {
          is: {
            id: orderId,
            AND: {
              deliveries: {
                every: {
                  delivery_boyId: id,
                },
              },
            },
          },
        },
        AND: {
          status: 'UNDER_DELIVERING',
        },
        OR: {
          status: 'FILTRATION',
        },
      },
    });
  }

  // wow another unmaintainable code
  // search for products based on status and delivery id
  // because  we do not have a relation with products because when you deliver thing to people we have relation with order because we deliver to one person
  // on pick side we will have one order have many products and products have suppliers and suppliers in different places
  // status for tracking thing
  private async fetchTasks(id: number, status, { take = 10, skip = 0 }) {
    return this.prisma.deliveryBoy.findMany({
      select: {
        delivery: {
          select: {
            orders: {
              select: {
                id: true,
                lat: true,
                lon: true,
                delivery_price: true,
                total_price: true,
                recipient: true,
              },
            },
          },
          take: take,
          skip: skip * take,
        },
      },
      where: {
        delivery: {
          every: {
            orders: {
              every: {
                products: {
                  every: {
                    status: status,
                  },
                },
              },
            },
          },
        },
        AND: {
          id: id,
        },
      },
    });
  }
}
