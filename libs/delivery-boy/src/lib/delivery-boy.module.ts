import { Module } from '@nestjs/common';
import { DeliveryBoyService } from './delivery-boy.service';
import { DeliveryBoyController } from './delivery-boy.controller';

@Module({
  controllers: [DeliveryBoyController],
  providers: [DeliveryBoyService],
  exports: [DeliveryBoyService],
})
export class DeliveryBoyModule {}
