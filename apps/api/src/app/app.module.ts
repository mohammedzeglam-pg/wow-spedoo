import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestUserController, NestUserService } from '@wow-spedoo/nest/user';
import { NestPrismaModule } from '@wow-spedoo/nest/prisma';
import { NestAuthModule } from '@wow-spedoo/nest/auth';
import { NestOrderController, NestOrderService } from '@wow-spedoo/nest/order';
import {
  NestPaymentController,
  NestPaymentService,
} from '@wow-spedoo/nest/payment';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@wow-spedoo/config';
import { validationSchema } from '@wow-spedoo/config';
import { NestRegionController, NestRegionService } from '@wow-spedoo/nest/region';
import {
  NestDeliveryBoyController,
  NestDeliveryBoyService,
} from '@wow-spedoo/nest/delivery-boy';
import {
  NestDeliveryController,
  NestDeliveryService,
} from '@wow-spedoo/nest/delivery';
import {
  NestPickBoyController,
  NestPickBoyService,
} from '@wow-spedoo/nest/pick-boy';
import { NestPickController, NestPickService } from '@wow-spedoo/nest/pick';
import {
  NestPartnerController,
  NestPartnerService,
} from '@wow-spedoo/nest/partner';
import {
  NestSupplierController,
  NestSupplierService,
} from '@wow-spedoo/nest/supplier';
import { NestTaskController, NestTaskService } from '@wow-spedoo/nest/task';
@Module({
  imports: [
    NestAuthModule,
    NestPrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
  ],
  controllers: [
    AppController,
    NestUserController,
    NestOrderController,
    NestPaymentController,
    NestRegionController,
    NestPickController,
    NestPickBoyController,
    NestDeliveryController,
    NestDeliveryBoyController,
    NestPartnerController,
    NestSupplierController,
    NestTaskController,
  ],
  providers: [
    AppService,
    NestUserService,
    NestOrderService,
    NestPaymentService,
    NestRegionService,
    NestDeliveryBoyService,
    NestDeliveryService,
    NestPickBoyService,
    NestPickService,
    NestPartnerService,
    NestSupplierService,
    NestTaskService,
  ],
})
export class AppModule {}
