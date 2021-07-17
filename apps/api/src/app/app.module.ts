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
import { ZoneController, ZoneService } from '@wow-spedoo/zone';
import {
  DeliveryBoyController,
  DeliveryBoyService,
} from '@wow-spedoo/delivery-boy';
import { DeliveryController, DeliveryService } from '@wow-spedoo/delivery';
import { PickBoyController, PickBoyService } from '@wow-spedoo/pick-boy';
import { PickController, PickService } from '@wow-spedoo/pick';
import { PartnerController, PartnerService } from '@wow-spedoo/partner';
import { SupplierController, SupplierService } from '@wow-spedoo/supplier';
@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
  ],
  controllers: [
    AppController,
    UserController,
    OrderController,
    PaymentController,
    ZoneController,
    PickController,
    PickBoyController,
    DeliveryController,
    DeliveryBoyController,
    PartnerController,
    SupplierController
  ],
  providers: [
    AppService,
    UserService,
    OrderService,
    PaymentService,
    ZoneService,
    DeliveryBoyService,
    DeliveryService,
    PickBoyService,
    PickService,
    PartnerService,
    SupplierService
  ],
})
export class AppModule {}
