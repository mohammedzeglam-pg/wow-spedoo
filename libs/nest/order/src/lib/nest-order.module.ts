import { Module } from '@nestjs/common';
import { NestOrderService } from './order.service';
import { NestOrderController } from './order.controller';

@Module({
  controllers: [NestOrderController],
  providers: [NestOrderService],
  exports: [NestOrderService],
})
export class NestOrderModule {}
