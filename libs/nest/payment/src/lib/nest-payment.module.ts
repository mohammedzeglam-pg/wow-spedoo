import { Module } from '@nestjs/common';
import { NestPaymentService } from './payment.service';
import { NestPaymentController } from './payment.controller';
import { NestPrismaModule } from '@wow-spedoo/nest/prisma';

@Module({
  imports: [NestPrismaModule],
  controllers: [NestPaymentController],
  providers: [NestPaymentService],
})
export class NestPaymentModule {}
