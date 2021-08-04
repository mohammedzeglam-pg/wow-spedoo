import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestUserModule } from '@wow-spedoo/nest/user';
import { NestAuthModule } from '@wow-spedoo/nest/auth';
import { NestOrderModule } from '@wow-spedoo/nest/order';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@wow-spedoo/config';
import { validationSchema } from '@wow-spedoo/config';
import { NestPickModule } from '@wow-spedoo/nest/pick';
import { NestSupplierModule } from '@wow-spedoo/nest/supplier';
import { NestTaskModule } from '@wow-spedoo/nest/task';
import { NestPrismaModule } from '@wow-spedoo/nest/prisma';
import { NestDeliveryModule } from '@wow-spedoo/nest/delivery';
import { NestRegionModule } from '@wow-spedoo/nest/region';
import { NestPaymentModule } from '@wow-spedoo/nest/payment';
import { NestPartnerModule } from '@wow-spedoo/nest/partner';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    NestAuthModule,
    NestPrismaModule,
    NestUserModule,
    NestSupplierModule,
    NestTaskModule,
    NestDeliveryModule,
    NestPickModule,
    NestRegionModule,
    NestOrderModule,
    NestPaymentModule,
    NestPartnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
