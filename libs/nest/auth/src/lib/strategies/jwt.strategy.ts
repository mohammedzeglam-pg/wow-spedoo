import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { NestAuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: NestAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: configService.get('isExpire'),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  async validate(payload: any) {
    return { ...payload };
  }
}
