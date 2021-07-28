import { Module } from '@nestjs/common';
import { NestPartnerService } from './partner.service';
import { NestPartnerController } from './partner.controller';

@Module({
  controllers: [NestPartnerController],
  providers: [NestPartnerService],
  exports: [NestPartnerService],
})
export class NestPartnerModule {}
