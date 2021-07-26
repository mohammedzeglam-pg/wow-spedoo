import { Injectable } from '@nestjs/common';
import { TaskStatus } from '@wow-spedoo/dto';
import { saveFile } from '@wow-spedoo/file-handler';
import { PrismaService } from '@wow-spedoo/prisma';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: refactor
  async getCount(identity: { id: number; role: string }) {
    switch (identity.role) {
      case 'PICKER': {
        return await this.getPickTasksCount(identity.id);
        break;
      }
      case 'DELIVERY': {
        return await this.getDeliveryTasksCount(identity.id);
        break;
      }
      default: {
        return null;
      }
    }
  }
  //TODO: complete miss it is legacy code from know
  //TODO: In future you must practise tdd & ddd
  async getDeliveryTasksCount(id: number) {
    const rs = await this.prisma.delivery.findMany({
      select: {
        orders: {
          select: {
            products: {
              where: {
                status: 'UNDER_DELIVERING',
              },
            },
          },
        },
      },
      where: {
        delivery_boyId: id,
      },
      orderBy: {
        id: 'desc',
      },
    });
    let count = 0;
    for (const el of rs) {
      for (const prod of el.orders) {
        count += prod?.products.length;
      }
    }
    return { tasks_count: count };
  }

  async getPickTasksCount(id: number) {
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
      orderBy: {
        id: 'desc',
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
    delete Object.assign(product.supplier, {
      ['receipt_from']: product.supplier['name'],
    })['name'];
    return product;
  }

  async updateTaskStatus(
    { id },
    identity: { role: string; id: number },
    updateTaskDto: { status: TaskStatus; note?: string },
  ) {
    switch (identity.role) {
      case 'DELIVERY': {
        return this.updateDeliveryTask(id, identity.id, updateTaskDto);
      }
      case 'PICKER': {
        return this.updatePickTask(id, identity.id, updateTaskDto);
      }
    }
  }

  private async updatePickTask(id: number, identity: number, updateTaskDto) {
    const pick = await this.prisma.pick.findFirst({
      select: {
        id: true,
        products: {
          where: {
            id: id,
            AND: {
              status: 'UNDER_PICKING',
            },
            OR: {
              status: 'CANCELED',
            },
          },
        },
      },
      where: {
        pick_boyId: identity,
      },
    });
    if (!pick) {
      return {
        message: 'not found',
      };
    }
    const task = await this.prisma.product.update({
      where: {
        id: id,
      },
      data: { ...updateTaskDto, times: { push: new Date() } },
    });
    if (task) {
      return {
        message: 'updated successfully',
      };
    }
  }

  async updateProductImage(file, id: number, identity: number) {
    const check = await this.prisma.product.findFirst({
      where: {
        id: id,
        pick: {
          pick_boyId: identity,
        },
      },
    });
    if (Object.keys(check).length) {
      const img_name = await saveFile(file);
      const product = await this.prisma.product.update({
        select: {
          id: true,
        },
        data: {
          img_url: img_name,
        },
        where: {
          id,
        },
      });
      if (Object.keys(product).length) {
        return {
          message: 'updated successfully',
        };
      }
    }
    return null;
  }

  async getPendingDeliveryTasks(id: number) {
    const delivery = await this.prisma.delivery.findMany({
      select: {
        id: true,
        orders: {
          select: {
            recipient: true,
            products: {
              where: {
                status: 'UNDER_DELIVERING',
              },
            },
          },
        },
      },
      where: {
        delivery_boyId: id,
      },
      orderBy: {
        id: 'desc',
      },
    });
    const rs = [];
    for (const el of delivery) {
      if (!el.orders.length) {
        continue;
      }
      const recipient = new Set();
      for (const prod of el.orders) {
        recipient.add(prod.recipient);
      }
      rs.push({ id: el.id, recipient: recipient.size });
    }
    return { data: rs };
  }

  async getDeliveryTaskDetial(identity: number, id: number) {
    const result = await this.prisma.delivery.findFirst({
      select: {
        id: true,
        orders: {
          select: {
            total_price: true,
            recipient: true,
            lon: true,
            lat: true,
            phone: true,
            payment: {
              select: {
                name: true,
                take_money: true,
                img_url: true,
              },
            },
            products: {
              select: { id: true },
              where: {
                status: 'UNDER_DELIVERING',
              },
            },
          },
        },
      },
      where: {
        id: id,
        AND: {
          delivery_boyId: identity,
        },
      },
    });
    for (const rs of result.orders) {
      rs['task_number'] = result.id;
      delete rs.products;
    }
    delete Object.assign(result, { ['data']: result['orders'] })['orders'];
    delete result.id;
    return result;
  }

  private async updateDeliveryTask(
    id: number,
    identity: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateTaskDto: { status: TaskStatus; note?: string },
  ) {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
      },
      where: {
        status: { in: ['UNDER_DELIVERING', 'CANCELED'] },
        order: {
          deliveries: {
            every: {
              id: id,
              delivery_boyId: identity,
            },
          },
        },
      },
    });
    const identifiers = new Set<number>();
    for (const prod of products) {
      identifiers.add(prod.id);
    }
    const updateProds = this.prisma.product.updateMany({
      data: updateTaskDto,
      where: {
        id: {
          in: [...identifiers.values()],
        },
      },
    });
    return { info: (await updateProds).count, message: 'updated successfully' };
  }

  async updateOrderImage(file: any, id: number, identity: number) {
    const delivery = await this.prisma.delivery.findFirst({
      select: {
        orders: {
          select: {
            id: true,
          },
          orderBy: {
            id: 'desc',
          },
        },
      },
      where: {
        id: id,
        delivery_boyId: identity,
      },
      orderBy: {
        id: 'desc',
      },
    });
    if (delivery.orders.length) {
      const img_name = await saveFile(file);
      const order = await this.prisma.order.update({
        where: {
          // shame
          id: delivery.orders[0].id,
        },
        data: {
          img_url: img_name,
        },
      });

      if (Object.keys(order).length) {
        return {
          message: 'updated successfully',
        };
      }
      return null;
    }
  }
}
