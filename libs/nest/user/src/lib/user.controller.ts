import { NestUserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Delete,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateUserCredential,
  IdTransformerDto,
  LoginCredential,
  UpdateUserCredential,
} from '@wow-spedoo/nest/dto';
import { PaginationDto } from '@wow-spedoo/nest/dto';
import { Role, Roles } from '@wow-spedoo/nest/auth';
import { JwtAuthGuard } from '@wow-spedoo/nest/auth';
import { RolesGuard } from '@wow-spedoo/nest/auth';
import { LoginResponse } from '@wow-spedoo/api-interfaces';
@Controller('user')
export class NestUserController {
  private readonly logger = new Logger(NestUserController.name);
  constructor(private userService: NestUserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async createNewUser(@Body() createUserCredential: CreateUserCredential) {
    try {
      const user = await this.userService.createUser(createUserCredential);
      return {
        message: 'تم الادخال بنجاح',
        data: user,
      };
    } catch (err) {
      this.logger.error(err);
      return new HttpException(err.meta, HttpStatus.CONFLICT);
    }
  }

  @Post('login')
  async login(
    @Body() loginCredential: LoginCredential,
  ): Promise<LoginResponse | HttpException> {
    console.log(loginCredential);
    try {
      const user = await this.userService.login(loginCredential);
      if (!user) {
        throw new Error('not found');
      }
      return user;
    } catch (err) {
      this.logger.error(err);
      return new HttpException('not found', HttpStatus.NOT_FOUND);
    }
  }
  @Get(':id')
  async userInfo(@Param() id: IdTransformerDto) {
    this.userService.userInfo(id);
  }
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update/:id')
  async updateUser(
    @Param() param: IdTransformerDto,
    @Body() updateUser: UpdateUserCredential,
  ) {
    try {
      const { id } = param;
      return await this.userService.updateUser(id, updateUser);
    } catch (err) {
      this.logger.error(err);
      return new HttpException(err.meta, HttpStatus.CONFLICT);
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  async deleteUser(@Param() param: IdTransformerDto) {
    try {
      console.log(param);
      const { id } = param;
      return await this.userService.deleteUser(id);
    } catch (err) {
      this.logger.error(err);
      return new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'can not delete this',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  // fetch user based on role

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('partner')
  async getManyPartner(@Query() paginationDto: PaginationDto) {
    try {
      return await this.userService.getManyPartner(paginationDto);
    } catch (err) {
      this.logger.error(err);
      return new HttpException(err.meta, HttpStatus.CONFLICT);
    }
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('pick')
  async getManyPickBoy(@Query() paginationDto: PaginationDto) {
    try {
      return await this.userService.getManyPickBoy(paginationDto);
    } catch (err) {
      this.logger.error(err);
      return new HttpException(err.meta, HttpStatus.CONFLICT);
    }
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('delivery')
  async getManyDeliveryBoy(@Query() paginationDto: PaginationDto) {
    try {
      return await this.userService.getManyDeliveriesBoy(paginationDto);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('allow/:id')
  async allowUser(@Param() id: IdTransformerDto) {
    try {
      const user = await this.userService.allowUser(id);
      return {
        data: user,
        state: 'allowed',
      };
    } catch (err) {
      this.logger.error(err);
    }
  }
}
