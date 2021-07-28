import { Module } from '@nestjs/common';
import { NestDeliveryService } from './delivery.service';
import { NestDeliveryController } from './delivery.controller';

@Module({
  controllers: [NestDeliveryController],
  providers: [NestDeliveryService],
  exports: [NestDeliveryService],
})
export class NestDeliveryModule {}
