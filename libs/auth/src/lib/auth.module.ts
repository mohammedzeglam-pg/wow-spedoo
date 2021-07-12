import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '@wow-spedoo/prisma';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './role.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
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
  providers: [AuthService, JwtStrategy, PrismaService,
       RolesGuard,
       JwtAuthGuard,
    ],
  exports: [AuthService,],
})
export class AuthModule {}
