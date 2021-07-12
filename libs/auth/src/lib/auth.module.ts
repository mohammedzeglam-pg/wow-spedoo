import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PrismaService } from '@wow-spedoo/prisma';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './role.guard';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '4h' },
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
