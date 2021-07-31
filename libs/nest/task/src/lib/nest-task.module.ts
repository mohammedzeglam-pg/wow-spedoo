import { Module } from '@nestjs/common';
import { NestTaskService } from './tasks.service';
import { NestTaskController } from './tasks.controller';
import { NestPrismaModule } from '@wow-spedoo/nest/prisma';

@Module({
  imports: [NestPrismaModule],
  controllers: [NestTaskController],
  providers: [NestTaskService],
  exports: [NestTaskService],
})
export class NestTaskModule {}
