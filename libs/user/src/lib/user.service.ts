import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import * as bcrypt from 'bcrypt';
import { AuthService } from '@wow-spedoo/auth';
import { Role } from '@prisma/client';
import { PaginationDto } from '@wow-spedoo/dto';
import { CreateUserResponse } from '@wow-spedoo/api-interfaces';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  // this shared to return value from code
  // don't panic if you see this.userObject just C+LeftMouse for vim user gd
  private readonly userObject = {
    id: true,
    username: true,
    firstname: true,
    phone: true,
    lastname: true,
    email: true,
  };

  async createUser(user): Promise<CreateUserResponse | void> {
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

  async updateUser(userId: number, data): Promise<CreateUserResponse> {
    return this.prisma.user.update({
      select: this.userObject,
      data: data,
      where: {
        id: userId,
      },
    });
  }
  async getManyPartner(
    pagination: PaginationDto,
  ): Promise<CreateUserResponse[]> {
    const search = {
      partner: {
        isNot: null,
      },
    };
    return this.fetchUserData(search, pagination);
  }

  async getManyPickBoy(
    pagination: PaginationDto,
  ): Promise<CreateUserResponse[]> {
    const search = {
      pick_boy: {
        isNot: null,
      },
    };

    return this.fetchUserData(search, pagination);
  }

  async getManyDeliveriesBoy(
    pagination: PaginationDto,
  ): Promise<CreateUserResponse[]> {
    const search = {
      delivery_boy: {
        isNot: null,
      },
    };

    return this.fetchUserData(search, pagination);
  }

  private async fetchUserData(
    search,
    pagination,
  ): Promise<CreateUserResponse[]> {
    const { take, skip } = pagination;
    return this.prisma.user.findMany({
      select: this.userObject,
      where: search,
      take: take,
      skip: skip * take,
    });
  }

  async deleteUser(id: number): Promise<CreateUserResponse> {
    return this.prisma.user.delete({
      select: this.userObject,
      where: {
        id: id,
      },
    });
  }
}
