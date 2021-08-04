import { Module } from '@nestjs/common';
import { NestPartnerService } from './partner.service';
import { NestPartnerController } from './partner.controller';
import { NestPrismaModule } from '@wow-spedoo/nest/prisma';

@Module({
  imports: [NestPrismaModule],
  controllers: [NestPartnerController],
  providers: [NestPartnerService],
  exports: [NestPartnerService],
})
export class NestPartnerModule {}
