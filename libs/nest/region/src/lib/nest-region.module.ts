import { Module } from '@nestjs/common';
import { NestRegionService } from './zone.service';
import { NestRegionController } from './zone.controller';
import { NestPrismaModule } from '@wow-spedoo/nest/prisma';

@Module({
  imports: [NestPrismaModule],
  controllers: [NestRegionController],
  providers: [NestRegionService],
})
export class NestRegionModule {}
