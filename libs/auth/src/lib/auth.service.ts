import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '@wow-spedoo/prisma';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}
  // async login(user: User) {
  //   const payload = { username: user.username, role: user.role };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async login(userCredentials) {
    const { email, password: pass } = userCredentials;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && this.validatePassword(user, pass)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, role, ...result } = user;

      const payload = { username: user.username, role: user.role };
      result['access_token'] = this.jwtService.sign(payload);
      return result;
    }
    return null;
  }

  // Validate User password becuase user hash
  async validatePassword(user: User, password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, user.salt);
    return hash === user.password;
  }
}
