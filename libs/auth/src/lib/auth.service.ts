import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@wow-spedoo/prisma';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async login(userCredentials) {
    try {
      const { email, password: pass } = userCredentials;
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          salt: true,
          role: true,
        },
      });

      const checkPass: boolean = await this.validatePassword(user, pass);
      if (user && checkPass) {
        const payload = { id: user.id, role: user.role };
        user['access_token'] = this.jwtService.sign(payload);
        return user;
      }
      return null;
    }catch(err){
      Logger.log(err);
    }
  }

  // Validate User password because user hash
  async validatePassword(user, password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, user.salt);
    return hash === user.password;
  }
}
