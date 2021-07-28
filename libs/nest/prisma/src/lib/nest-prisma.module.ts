import { Module } from '@nestjs/common';
import { NestPrismaService } from './prisma.service';

@Module({
  controllers: [],
  providers: [NestPrismaService],
  exports: [NestPrismaService],
})
export class NestPrismaModule {}
