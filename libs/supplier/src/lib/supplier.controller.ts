import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import {
  AddSupplierDto,
  IdTransformerDto,
  PaginationDto,
} from '@wow-spedoo/dto';
import {
  JwtAuthGuard,
  PartnerDecorator,
  Role,
  Roles,
  RolesGuard,
} from '@wow-spedoo/auth';

@Controller('supplier')
export class SupplierController {
  private readonly logger = new Logger(SupplierController.name);
  constructor(private readonly supplierService: SupplierService) {}

  @Roles(Role.PARTNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async AddSupplier(
    @PartnerDecorator() id,
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
  @Post('edit/:id')
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
    @PartnerDecorator() id,
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
    @PartnerDecorator() id,
    @Query() pagination: PaginationDto,
  ) {
    try {
      return await this.supplierService.getManySupplier(id, pagination);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
