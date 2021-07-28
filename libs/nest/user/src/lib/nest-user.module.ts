import { Module } from '@nestjs/common';
import { NestUserService } from './user.service';
import { NestUserController } from './user.controller';
@Module({
  controllers: [NestUserController],
  providers: [NestUserService],
  exports: [NestUserService],
})
export class NestUserModule {}
