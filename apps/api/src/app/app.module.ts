import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController, UserService } from '@wow-spedoo/user';
import { PrismaModule } from '@wow-spedoo/prisma';
import { AuthModule } from '@wow-spedoo/auth';
// import { OrderController, OrderService } from '@wow-spedoo/order';
@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AppController, UserController ],
  providers: [AppService, UserService,
  ],
})
export class AppModule {}
