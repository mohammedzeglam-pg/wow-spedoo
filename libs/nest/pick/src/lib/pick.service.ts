import { Injectable } from '@nestjs/common';
import { NestPrismaService } from '@wow-spedoo/nest/prisma';
import { ProductStatus } from '@prisma/client';
import { IdTransformerDto, PaginationDto } from '@wow-spedoo/nest/dto';

@Injectable()
export class NestPickService {
  constructor(private prisma: NestPrismaService) {}

  async getUnfinishedPickTasks(paginationDto: { take: number; skip: number }) {
    return this.fetchTasks(ProductStatus.UNDER_REVIEW, paginationDto);
  }

  async getFinishedPickTasks(paginationDto: { take: number; skip: number }) {
    return this.fetchTasks(ProductStatus.PICKED, paginationDto);
  }

  async addPickTask({ products, pick_boy, total_location, total_pieces }) {
    // init
    let id: { id: number } = { id: 0 };
    for (let i = 0; i < products.length; i++) {
      if (i === 0) {
        id = await this.prisma.pick.create({
          select: {
            id: true,
          },
          data: {
            total_location,
            total_pieces,
            pick_boy: {
              connect: {
                id: pick_boy,
              },
            },
            products: {
              connect: {
                id: products[i],
              },
            },
          },
        });
      } else {
        await this.prisma.pick.update({
          where: {
            id: id.id,
          },
          data: {
            products: {
              connect: {
                id: products[i],
              },
            },
          },
        });
      }
      await this.prisma.product.update({
        where: {
          id: products[i],
        },
        data: {
          status: ProductStatus.UNDER_PICKING,
          times: {
            push: new Date(),
          },
        },
      });
    }
  }

  private async fetchTasks(
    productStatus: ProductStatus,
    { take = 10, skip = 0 },
  ) {
    return this.prisma.product.findMany({
      where: {
        status: productStatus,
      },
      orderBy: {
        supplierId: 'asc',
      },
      take: take,
      skip: take * skip,
    });
  }

  getTasks({ take, skip }: PaginationDto) {
    this.prisma.pick.findMany({
      select: {
        id: true,
        total_location: true,
        total_pieces: true,
        pick_boy: {
          select: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
      take: take,
      skip: skip * take,
    });
  }

  getProducts() {
    return this.prisma.product.findMany({
      select: {
        id: true,
        supplier: {
          select: {
            name: true,
            zone: true,
          },
        },
      },
      where: {
        status: 'UNDER_REVIEW',
      },
    });
  }

  getPickBoies({ id }: IdTransformerDto) {
    this.prisma.pickBoy.findMany({
      where: {
        zoneId: id,
      },
    });
  }
}
