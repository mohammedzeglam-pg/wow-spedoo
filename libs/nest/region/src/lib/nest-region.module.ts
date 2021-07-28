import { Module } from '@nestjs/common';
import { NestRegionService } from './zone.service';
import { NestRegionController } from './zone.controller';

@Module({
  controllers: [NestRegionController],
  providers: [NestRegionService],
  exports: [NestRegionService],
})
export class NestRegionModule {}
