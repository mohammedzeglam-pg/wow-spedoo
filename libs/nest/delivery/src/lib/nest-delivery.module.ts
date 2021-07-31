import { Module } from '@nestjs/common';
import { NestDeliveryService } from './delivery.service';
import { NestDeliveryController } from './delivery.controller';
import { NestPrismaModule } from '@wow-spedoo/nest/prisma';

@Module({
  imports: [NestPrismaModule],
  controllers: [NestDeliveryController],
  providers: [NestDeliveryService],
  exports: [NestDeliveryService],
})
export class NestDeliveryModule {}
