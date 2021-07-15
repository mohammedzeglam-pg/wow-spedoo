import {
  INestApplication,
  Injectable, Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  private readonly defaultAdmin: {email:string,phone:string,password:string};

  constructor(private readonly config:ConfigService) {
    super();
    this.defaultAdmin = this.config.get('admin');
  }
  async onModuleInit() {
    await this.$connect;
    await this.ensureAdminUser();
  }
  async onModuleDestroy() {
    await this.$disconnect;
  }
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  private async createDefaultUser(data: { email: string; password: string,phone:string }) {
    const salt = await bcrypt.genSalt();
    data.password =await bcrypt.hash(data.password, salt);
    return this.user.create({
      data: {
        ...data,
        role:'ADMIN',
        username:'admin',
        firstname:'admin',
        lastname:'amin',
        salt:salt,
        is_allowed:true,
      },
    });
  }
  private async findDefaultUser() {
    return this.user.findUnique({
      select:{
        id:true,
      },
      where: {
        email:this.defaultAdmin.email,
      },
    })
  }
  private async ensureAdminUser() {
    // Check if we have an admin
    const found = await this.findDefaultUser();
    if (found) {
      Logger.log(`Admin user created`);
      return true
    }
    // If not, create it for us
    const created = await this.createDefaultUser(this.defaultAdmin)
    Logger.log(`Created Admin user: ${created.email}`, 'DataService')
  }
}
