import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NestPrismaService } from '@wow-spedoo/nest/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class NestAuthService {
  private readonly logger = new Logger(NestAuthService.name);
  constructor(
    private jwtService: JwtService,
    private prisma: NestPrismaService,
  ) {}

  async login(userCredentials) {
    try {
      const { phone, password: pass } = userCredentials;
      const user = await this.prisma.user.findUnique({
        where: { phone },
        select: {
          id: true,
          email: true,
          role: true,
          password: true,
          salt: true,
          username: true,
          phone: true,
          is_allowed: true,
          partner: {
            select: {
              id: true,
            },
          },
          pick_boy: {
            select: {
              id: true,
            },
          },
          delivery_boy: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!user?.is_allowed) {
        return null;
      }
      const checkPass: boolean = await this.validatePassword(user, pass);
      if (user && checkPass) {
        const payload = {
          id: user.id,
          role: user.role,
          email: user.email,
          phone: user.phone,
          partner: user.partner,
          pick: user.pick_boy,
          delivery: user.delivery_boy,
        };
        user['access_token'] = this.jwtService.sign(payload);
        return this.resultResponse(user);
      }
      return null;
    } catch (err) {
      this.logger.error(err);
      throw new Error(err);
    }
  }

  // Validate NestUser password because user hash
  async validatePassword(user, password: string): Promise<boolean> {
    try {
      const hash = await bcrypt.hash(password, user.salt);
      return hash === user.password;
    } catch (err) {
      Logger.warn(err);
      this.logger.error(err);
    }
  }

  private resultResponse(user) {
    delete user.password;
    delete user.id;
    delete user.salt;
    const { id: identity } =
      user?.partner || user?.delivery_boy || user?.pick_boy || 1;
    delete user.partner;
    delete user.delivery_boy;
    delete user.pick_boy;
    user.role = user.role?.toLowerCase();
    user.identity = identity;
    return user;
  }
}
