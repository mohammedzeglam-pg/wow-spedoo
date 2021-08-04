import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NestSupplierService } from './supplier.service';
import {
  AddSupplierDto,
  IdTransformerDto,
  PaginationDto,
} from '@wow-spedoo/nest/dto';
import {
  JwtAuthGuard,
  NestPartnerDecorator,
  Role,
  Roles,
  RolesGuard,
} from '@wow-spedoo/nest/auth';

@Controller('supplier')
export class NestSupplierController {
  private readonly logger = new Logger(NestSupplierController.name);
  constructor(private readonly supplierService: NestSupplierService) {}

  @Roles(Role.PARTNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('')
  async AddSupplier(
    @NestPartnerDecorator() id,
    @Body() addSupplierDto: AddSupplierDto,
  ) {
    try {
      return await this.supplierService.addSupplier(id, addSupplierDto);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.PARTNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  async updateSupplier(
    @Param() id: IdTransformerDto,
    @Body() addSupplierDto: AddSupplierDto,
  ) {
    try {
      return await this.supplierService.updateSupplier(id, addSupplierDto);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.PARTNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getSupplier(
    @NestPartnerDecorator() id,
    @Param() supplierId: IdTransformerDto,
  ) {
    try {
      return await this.supplierService.getSupplier(id, supplierId);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.PARTNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('many')
  async getManySupplier(
    @NestPartnerDecorator() id,
    @Query() pagination: PaginationDto,
  ) {
    try {
      return await this.supplierService.getManySupplier(id, pagination);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
