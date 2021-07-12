import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@wow-spedoo/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService, private prisma: PrismaService) {}
  async login(userCredentials) {
    try {
      Logger.log(userCredentials);
      const { phone, password: pass } = userCredentials;
      const user = await this.prisma.user.findUnique({
        where: { phone },
        select: {
          id: true,
          email: true,
          role: true,
          password:true,
          salt:true,
          username:true,
          phone:true,
        },
      });

      const checkPass: boolean = await this.validatePassword(user, pass);
      if (user && checkPass) {
        const payload = { id: user.id, role: user.role,email:user.email,phone:user.phone };
        user['access_token'] = this.jwtService.sign(payload);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password,role,id,salt,...rs} = user;
        return rs;
      }
      return null;
    } catch (err) {
      Logger.log(err);
    }
  }

  // Validate User password because user hash
  async validatePassword(user, password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, user.salt);
    return hash === user.password;
  }
}
