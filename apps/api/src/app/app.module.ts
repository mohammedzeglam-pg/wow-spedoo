import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController, UserService } from '@wow-spedoo/user';
import { PrismaModule } from '@wow-spedoo/prisma';
import { AuthModule } from '@wow-spedoo/auth';
import { OrderController, OrderService } from '@wow-spedoo/order';
import { PaymentController, PaymentService } from '@wow-spedoo/payment';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@wow-spedoo/config';
import { validationSchema } from '@wow-spedoo/config';
@Module({
  imports: [AuthModule, PrismaModule,ConfigModule.forRoot({
    isGlobal:true,
    load:[configuration],
    validationSchema,
  })],
  controllers: [AppController, UserController,OrderController,PaymentController ],
  providers: [AppService, UserService,OrderService,PaymentService ],
})
export class AppModule {}
