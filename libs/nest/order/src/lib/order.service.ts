import { Injectable } from '@nestjs/common';
import { NestPrismaService } from '@wow-spedoo/nest/prisma';
import { Transaction } from '@prisma/client';
import { CreateOrderDto, PaginationDto } from '@wow-spedoo/nest/dto';
type Point = {
  lon: number;
  lat: number;
};
@Injectable()
export class NestOrderService {
  constructor(private prisma: NestPrismaService) {}

  async addOrder(
    { payment_method, products, ...order }: CreateOrderDto,
    token: string,
  ) {
    const point: Point = order;
    const { id: zoneId, price: delivery_price } = await this.getPricing(point);

    if (!delivery_price) {
      return {
        message: 'regoin not supported',
      };
    }
    const orderData = await this.prisma.order.create({
      select: {
        id: true,
        delivery_price: true,
        total_price: true,
        zone: {
          select: {
            name: true,
          },
        },
        partner: {
          select: {
            profit: true,
            id: true,
          },
        },
        payment: {
          select: {
            take_money: true,
          },
        },
      },
      data: {
        ...order,
        delivery_price,
        partner: {
          connect: {
            token: token,
          },
        },
        payment: {
          connect: {
            ...payment_method,
          },
        },
        products: {
          createMany: {
            data: [...products],
          },
        },
        zone: {
          connect: {
            id: zoneId,
          },
        },
      },
    });
    await this.financials(orderData, order, delivery_price);
    return {
      id: orderData.id,
      delivery_price: orderData.delivery_price,
      total_price: order.total_price,
      amount: order.total_price + delivery_price,
    };
  }

  async getOrderDetails(orderId: number, token: string) {
    return this.prisma.order.findFirst({
      select: {
        order_id: true,
        products: {
          select: {
            name: true,
            status: true,
          },
        },
      },
      where: {
        id: orderId,
        AND: {
          partner: {
            is: {
              token: token,
            },
          },
        },
      },
    });
  }

  async getPricing(point: { lon: number; lat: number }) {
    const polygons = await this.getPolygons();
    for (const poly of polygons) {
      const { id, price } = poly;
      const locations = poly.locations;
      const check = this.pointInPolygon({ p: point, points: locations });
      if (check) {
        return { id, price };
      }
    }
    return null;
  }

  private async financials(
    orderData: {
      id: number;
      payment: { take_money: boolean };
      partner: { profit: number; id: number };
    },
    order: Pick<
      CreateOrderDto,
      'order_id' | 'total_pieces' | 'recipient' | 'total_price' | 'lat' | 'lon'
    >,
    delivery_price,
  ) {
    const { payment } = orderData;
    const { partner } = orderData;
    // Debt on company
    const transaction = payment.take_money
      ? Transaction.DUES
      : Transaction.DEBT;
    const { profit } = partner;
    if (payment.take_money) {
      const amount =
        profit == 0.0
          ? order.total_price
          : order.total_price + (profit * delivery_price) / 100;
      await this.prisma.partner.update({
        where: {
          id: partner.id,
        },
        data: {
          financials: {
            create: {
              transaction: transaction,
              amount: amount,
            },
          },
        },
      });
    } else {
      const amount =
        profit == 0.0
          ? delivery_price
          : delivery_price - (profit * delivery_price) / 100;
      await this.prisma.partner.update({
        where: {
          id: partner.id,
        },
        data: {
          financials: {
            create: {
              transaction: transaction,
              amount: amount,
            },
          },
        },
      });
    }
  }

  async getPolygons() {
    return this.prisma.zone.findMany({
      select: {
        id: true,
        price: true,
        locations: {
          select: {
            lat: true,
            lon: true,
          },
        },
      },
    });
  }

  // Winding number algorithm
  // read about this topic https://en.wikipedia.org/wiki/Point_in_polygon
  private static cross(x: Point, y: Point, z: Point): number {
    return (
      (y.lon - x.lon) * (z.lat - x.lat) - (z.lon - x.lon) * (y.lat - x.lat)
    );
  }
  private pointInPolygon({
    p,
    points,
  }: {
    p: Point;
    points: Array<Point>;
  }): boolean {
    let wn = 0; // winding number

    points.forEach((a, i) => {
      const b = points[(i + 1) % points.length];
      if (a.lat <= p.lat) {
        if (b.lat > p.lat && NestOrderService.cross(a, b, p) > 0) {
          wn += 1;
        }
      } else if (b.lat <= p.lat && NestOrderService.cross(a, b, p) < 0) {
        wn -= 1;
      }
    });

    return wn !== 0;
  }

  async getManyOrder({ take, skip }: PaginationDto) {
    return this.prisma.order.findMany({
      select: {
        id: true,
        order_id: true,
        delivery_price: true,
        total_price: true,
        zone: {
          select: {
            name: true,
          },
        },
        partner: {
          select: {
            user: {
              select: {
                img_url: true,
              },
            },
          },
        },
        total_pieces: true,
        recipient: true,
        payment: {
          select: {
            img_url: true,
          },
        },
      },
      take: take,
      skip: skip * take,
    });
  }
}
