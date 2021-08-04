import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NestPartnerService } from './partner.service';
import {
  JwtAuthGuard,
  NestPartnerDecorator,
  Role,
  Roles,
  RolesGuard,
} from '@wow-spedoo/nest/auth';
import { PaginationDto } from '@wow-spedoo/nest/dto';
@Controller('partner')
export class NestPartnerController {
  private readonly logger = new Logger(NestPartnerController.name);
  constructor(private partnerService: NestPartnerService) {}

  @Roles(Role.ADMIN, Role.PARTNER, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('token/change')
  async changeToken(@NestPartnerDecorator() id: number) {
    try {
      return await this.partnerService.changeToken(id);
    } catch (err) {
      this.logger.error(err);
      return new HttpException(err.code, HttpStatus.CONFLICT);
    }
  }

  @Roles(Role.ADMIN, Role.PARTNER, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('token')
  async getToken(@NestPartnerDecorator() id: number) {
    try {
      return await this.partnerService.getToken(id);
    } catch (err) {
      this.logger.error(err);
      return new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }

  @Roles(Role.ADMIN, Role.PARTNER, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('order')
  async getManyOrder(
    @NestPartnerDecorator() id: number,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return await this.partnerService.getManyOrder(id, paginationDto);
    } catch (err) {
      this.logger.error(err);
      return new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }

  @Roles(Role.ADMIN, Role.PARTNER, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('order/products/:id')
  async getOrderDetails(
    @NestPartnerDecorator() id: number,
    @Param('id', ParseIntPipe) order: number,
  ) {
    try {
      return await this.partnerService.getOrderDetails(id, order);
    } catch (err) {
      this.logger.error(err);
      return new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }

  @Roles(Role.ADMIN, Role.PARTNER, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('financial/under_review')
  async getUnderReviewFinancial(
    @NestPartnerDecorator() id: number,
    pagination: PaginationDto,
  ) {
    try {
      return this.partnerService.getUnderReviewFinancial(id, pagination);
    } catch (err) {
      this.logger.error(err);
      return new HttpException(err.constructor, HttpStatus.NOT_FOUND);
    }
  }

  @Roles(Role.ADMIN, Role.PARTNER, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('financial/completed')
  async getCompleteFinancial(
    @NestPartnerDecorator() id: number,
    pagination: PaginationDto,
  ) {
    try {
      return this.partnerService.getCompletedFinancial(id, pagination);
    } catch (err) {
      this.logger.error(err);
      return new HttpException(err.constructor, HttpStatus.NOT_FOUND);
    }
  }

  @Roles(Role.PARTNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  async getPartnerInfo(@NestPartnerDecorator() id: number) {
    return this.partnerService.getPartnerInfo(id);
  }
}
