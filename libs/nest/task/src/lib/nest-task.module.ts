import { Module } from '@nestjs/common';
import { NestTaskService } from './tasks.service';
import { NestTaskController } from './tasks.controller';

@Module({
  controllers: [NestTaskController],
  providers: [NestTaskService],
  exports: [NestTaskService],
})
export class NestTaskModule {}
