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
import { PartnerService } from './partner.service';
import {
  JwtAuthGuard,
  PartnerDecorator,
  Role,
  Roles,
  RolesGuard,
} from '@wow-spedoo/auth';
import { PaginationDto } from '@wow-spedoo/dto';
@Controller('partner')
export class PartnerController {
  private readonly logger = new Logger(PartnerController.name);
  constructor(private partnerService: PartnerService) {}

  @Roles(Role.ADMIN, Role.PARTNER, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('token/change')
  async changeToken(@PartnerDecorator() id: number) {
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
  async getToken(@PartnerDecorator() id: number) {
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
  async getManyOrder( @PartnerDecorator() id: number, @Query() paginationDto: PaginationDto) {
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
    @PartnerDecorator() id: number,
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
    @PartnerDecorator() id: number,
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
    @PartnerDecorator() id: number,
    pagination: PaginationDto,
  ) {
    try {
      return this.partnerService.getCompletedFinancial(id, pagination);
    } catch (err) {
      this.logger.error(err);
      return new HttpException(err.constructor, HttpStatus.NOT_FOUND);
    }
  }
}
