import { Injectable } from '@nestjs/common';
import { NestPrismaService } from '@wow-spedoo/nest/prisma';
import { FinancialStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class NestPartnerService {
  constructor(private readonly prisma: NestPrismaService) {}

  async changeToken(id) {
    return this.prisma.partner.update({
      data: {
        token: uuidv4(),
      },
      where: {
        id: id,
      },
    });
  }

  async getManyOrder(id: number, pagination: { take: number; skip: number }) {
    return this.prisma.order.findMany({
      select: {
        id: true,
        order_id: true,
        total_pieces: true,
        recipient: true,
        total_price: true,
        delivery_price: true,
        payment: {
          select: {
            name: true,
          },
        },
        created_at: true,
        note: true,
      },
      where: {
        partnerId: id,
      },
      take: pagination.take,
      skip: pagination.take * pagination.skip,
    });
  }

  async getOrderDetails(id: number, order: number) {
    return this.prisma.order.findMany({
      select: {
        products: {
          select: {
            id: true,
            name: true,
            total_pieces: true,
            times: true,
            status: true,
            note: true,
          },
        },
      },
      where: {
        id: order,
        AND: {
          partnerId: id,
        },
      },
    });
  }

  async getToken(id: number) {
    return this.prisma.partner.findFirst({
      select: {
        token: true,
      },
      where: {
        id: id,
      },
    });
  }
  async getUnderReviewFinancial(id: number, { take = 10, skip = 0 }) {
    return this.fetchFinancial(id, FinancialStatus.DONE, { take, skip });
  }

  async getCompletedFinancial(id: number, { take = 10, skip = 0 }) {
    return this.fetchFinancial(id, FinancialStatus.DONE, { take, skip });
  }

  private async fetchFinancial(
    id: number,
    status: FinancialStatus,
    { take = 10, skip = 0 },
  ) {
    return this.prisma.financial.findMany({
      where: {
        partnerId: id,
        AND: {
          status: status,
        },
      },
      take: take,
      skip: take * skip,
    });
  }
}
