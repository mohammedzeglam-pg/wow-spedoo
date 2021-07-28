import { Module } from '@nestjs/common';
import { NestPaymentService } from './payment.service';
import { NestPaymentController } from './payment.controller';

@Module({
  controllers: [NestPaymentController],
  providers: [NestPaymentService],
  exports: [NestPaymentService],
})
export class NestPaymentModule {}
