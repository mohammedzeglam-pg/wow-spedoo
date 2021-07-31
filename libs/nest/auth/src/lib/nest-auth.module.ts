import { Module } from '@nestjs/common';
import { NestAuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { NestPrismaModule, NestPrismaService } from '@wow-spedoo/nest/prisma';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './role.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiKeyAuthGuard } from './api-key-auth.guard';
@Module({
  imports: [
    NestPrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [
    NestAuthService,
    JwtStrategy,
    NestPrismaService,
    RolesGuard,
    JwtAuthGuard,
    ApiKeyAuthGuard,
  ],
  exports: [NestAuthService],
})
export class NestAuthModule {}
