import { Module } from '@nestjs/common';
import { NestSupplierService } from './supplier.service';
import { NestSupplierController } from './supplier.controller';
import { NestPrismaModule } from '@wow-spedoo/nest/prisma';

@Module({
  imports: [NestPrismaModule],
  controllers: [NestSupplierController],
  providers: [NestSupplierService],
  exports: [NestSupplierService],
})
export class NestSupplierModule {}
