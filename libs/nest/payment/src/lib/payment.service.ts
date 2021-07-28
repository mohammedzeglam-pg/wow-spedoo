import { Injectable } from '@nestjs/common';
import { NestPrismaService } from '@wow-spedoo/nest/prisma';

@Injectable()
export class NestPaymentService {
  constructor(private readonly prisma: NestPrismaService) {}
  private readonly payment = {
    id: true,
    name: true,
    take_money: true,
    img_url: true,
  };
  async addPaymentMethod(addPaymentDto: { name: string; take_money: boolean }) {
    return this.prisma.paymentMethod.create({
      select: this.payment,
      data: addPaymentDto,
    });
  }
  async getAllPaymentMethod() {
    return this.prisma.paymentMethod.findMany({
      select: this.payment,
    });
  }
  async getSpecificPaymentMethod(paymentMethodDto: { id: number }) {
    return this.prisma.paymentMethod.findFirst({
      select: this.payment,
      where: paymentMethodDto,
    });
  }

  async updatePaymentMethod(
    paymentMethodDto: { id: number },
    updatePaymentDto: { name?: string; is_take?: boolean },
  ) {
    return this.prisma.paymentMethod.update({
      data: updatePaymentDto,
      where: paymentMethodDto,
    });
  }
}
