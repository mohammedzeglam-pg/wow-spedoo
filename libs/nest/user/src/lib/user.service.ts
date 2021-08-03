import { Injectable } from '@nestjs/common';
import { NestPrismaService } from '@wow-spedoo/nest/prisma';
import * as bcrypt from 'bcrypt';
import { NestAuthService } from '@wow-spedoo/nest/auth';
import { Role } from '@prisma/client';
import { IdTransformerDto, PaginationDto } from '@wow-spedoo/nest/dto';

@Injectable()
export class NestUserService {
  constructor(
    private prisma: NestPrismaService,
    private authService: NestAuthService,
  ) {}

  private readonly userObject = {
    id: true,
    username: true,
    firstname: true,
    phone: true,
    lastname: true,
    email: true,
    is_allowed: true,
    role: true,
  };

  async createUser(user) {
    // hash password using salt techniques
    const salt = await bcrypt.genSalt();
    // save encrypted password and salt
    user.password = await bcrypt.hash(user.password, salt);
    user.salt = salt;

    // Create relation with another tables
    if (user.role === Role.DELIVERY) {
      user.delivery_boy = {
        create: {},
      };
    } else if (user.role === Role.PICKER) {
      user.pick_boy = {
        create: {},
      };
    } else if (user.role === Role.PARTNER) {
      user.partner = {
        create: {},
      };
    }
    // insert data to db
    return this.prisma.user.create({
      data: user,
      select: this.userObject,
    });
  }

  login(user) {
    return this.authService.login(user);
  }

  async updateUser(userId: number, data) {
    return this.prisma.user.update({
      select: this.userObject,
      data: data,
      where: {
        id: userId,
      },
    });
  }
  async getManyPartner(pagination: PaginationDto) {
    const search = {
      role: 'PARTNER',
    };
    return this.fetchUserData(search, pagination);
  }

  async getManyUsers(pagination: PaginationDto) {
    const search = {};
    return this.fetchUserData(search, pagination);
  }
  async getManyPickBoy(pagination: PaginationDto) {
    const search = {
      role: 'PICKER',
    };

    return this.fetchUserData(search, pagination);
  }

  async getManyDeliveriesBoy(pagination: PaginationDto) {
    const search = {
      role: 'DELIVERY',
    };
    return this.fetchUserData(search, pagination);
  }

  private async fetchUserData(search, pagination) {
    const { take, skip } = pagination;
    const users = await this.prisma.user.findMany({
      select: this.userObject,
      where: search,
      take: take,
      skip: skip * take,
    });
    return users;
  }

  async deleteUser(id) {
    return this.prisma.user.delete({
      select: this.userObject,
      where: id,
    });
  }

  async allowUser(id: { id: number }) {
    return this.prisma.user.update({
      select: this.userObject,
      where: id,
      data: {
        is_allowed: true,
      },
    });
  }

  userInfo(id) {
    return this.prisma.user.findUnique({
      where: id,
      select: this.userObject,
    });
  }

  async updateBoyZone(id: IdTransformerDto, zoneId: number) {
    const userRole = await this.prisma.user.findUnique({
      where: id,
      select: { role: true },
    });
    let data = {};
    if (userRole.role === 'PICKER') {
      data = {
        pick_boy: {
          update: {
            zone: {
              connect: { id: zoneId },
            },
          },
        },
      };
    } else if (userRole.role == 'DELIVERY') {
      data = {
        delivery_boy: {
          update: {
            zone: {
              connect: { id: zoneId },
            },
          },
        },
      };
    }
    return this.prisma.user.update({
      where: id,
      data: data,
    });
  }

  updateProfit(id: IdTransformerDto, profit: number) {
    return this.prisma.user.update({
      where: id,
      data: {
        partner: {
          update: {
            profit: profit,
          },
        },
      },
    });
  }
}
