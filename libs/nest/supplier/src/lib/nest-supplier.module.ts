import { Module } from '@nestjs/common';
import { NestSupplierService } from './supplier.service';
import { NestSupplierController } from './supplier.controller';

@Module({
  controllers: [NestSupplierController],
  providers: [NestSupplierService],
  exports: [NestSupplierService],
})
export class NestSupplierModule {}
