import { Module } from '@nestjs/common';
import { NestOrderService } from './order.service';
import { NestOrderController } from './order.controller';
import { NestPrismaModule } from '@wow-spedoo/nest/prisma';

@Module({
  imports: [NestPrismaModule],
  controllers: [NestOrderController],
  providers: [NestOrderService],
})
export class NestOrderModule {}
