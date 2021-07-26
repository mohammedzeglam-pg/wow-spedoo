import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: refactor
  async getCount(identity: { id: number; role: string }) {
    console.log(identity);
    switch (identity.role) {
      case 'PICKER': {
        return await this.getPickTasks(identity.id);
        break;
      }
      case 'DELIVERY': {
        break;
      }
      default: {
        return null;
      }
    }
  }

  async getPickTasks(id: number) {
    const arr = await this.prisma.pickBoy.findFirst({
      select: {
        pick: {
          select: {
            products: {
              select: { id: true },
              where: {
                status: 'UNDER_PICKING',
              },
            },
          },
        },
      },
      where: {
        id: id,
      },
    });
    let count = 0;
    for (const el of arr.pick) {
      count += el.products.length;
    }
    return { tasks_count: count };
  }

  async getPendingPickTasks(identity: { role: string; id: number }) {
    const result = await this.prisma.product.findMany({
      select: {
        supplierId: true,
        id: true,
        status: true,
      },
      where: {
        status: 'UNDER_PICKING',
        AND: {
          pick: {
            is: {
              pick_boyId: identity.id,
            },
          },
        },
      },
    });
    const recipient = new Set();
    for (const el of result) {
      recipient.add(el.supplierId);
      delete Object.assign(el, { ['tasks_number']: el['id'] })['id'];
      delete el.supplierId;
    }
    return { data: result, recipients: recipient.size };
  }

  async getPickTaskDetial(identity: number, id: number) {
    const product = await this.prisma.product.findFirst({
      select: {
        name: true,
        img_url: true,
        supplier: {
          select: {
            name: true,
            phone: true,
            lat: true,
            lon: true,
          },
        },
      },
      where: {
        id: id,
        AND: {
          pick: { pick_boyId: identity },
          AND: {
            status: 'UNDER_PICKING',
          },
        },
      },
    });
    // receipt_from
    delete Object.assign(product.supplier, {
      ['receipt_from']: product.supplier['name'],
    })['name'];
    return product;
  }
}
