import { Injectable } from '@nestjs/common';
import { NestPrismaService } from '@wow-spedoo/nest/prisma';
import * as bcrypt from 'bcrypt';
import { NestAuthService } from '@wow-spedoo/nest/auth';
import { Role } from '@prisma/client';
import { PaginationDto } from '@wow-spedoo/nest/dto';

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
      partner: {
        isNot: null,
      },
    };
    return this.fetchUserData(search, pagination);
  }

  async getManyPickBoy(pagination: PaginationDto) {
    const search = {
      pick_boy: {
        isNot: null,
      },
    };

    return this.fetchUserData(search, pagination);
  }

  //TODO: bug in prisma
  async getManyDeliveriesBoy(pagination: PaginationDto) {
    const { take, skip } = pagination;
    const data = await this.prisma.deliveryBoy.findMany({
      select: { user: { select: this.userObject } },
      take: take,
      skip: skip * take,
    });
    const users = [];
    for (const el of data) {
      const { user } = el;
      users.push(user);
    }
    return {
      data: users,
    };
  }

  private async fetchUserData(search, pagination) {
    const { take, skip } = pagination;
    const users = await this.prisma.user.findMany({
      select: this.userObject,
      where: search,
      take: take,
      skip: skip * take,
    });
    return {
      data: users,
    };
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      select: this.userObject,
      where: {
        id: id,
      },
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
}
