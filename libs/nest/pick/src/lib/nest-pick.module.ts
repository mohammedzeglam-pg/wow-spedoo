import { Module } from '@nestjs/common';
import { NestPickService } from './pick.service';
import { NestPickController } from './pick.controller';

@Module({
  controllers: [NestPickController],
  providers: [NestPickService],
  exports: [NestPickService],
})
export class NestPickModule {}
