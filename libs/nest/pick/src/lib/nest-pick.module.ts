import { Module } from '@nestjs/common';
import { NestPickService } from './pick.service';
import { NestPickController } from './pick.controller';
import { NestPrismaModule } from '@wow-spedoo/nest/prisma';

@Module({
  imports: [NestPrismaModule],
  controllers: [NestPickController],
  providers: [NestPickService],
  exports: [NestPickService],
})
export class NestPickModule {}
