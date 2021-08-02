import { Module } from '@nestjs/common';
import { NestUserService } from './user.service';
import { NestUserController } from './user.controller';
import { NestPrismaModule } from '@wow-spedoo/nest/prisma';
import { NestAuthModule } from '@wow-spedoo/nest/auth';
@Module({
  imports: [NestPrismaModule, NestAuthModule],
  controllers: [NestUserController],
  providers: [NestUserService],
})
export class NestUserModule {}
