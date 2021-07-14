import { Controller, Get, Logger, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { AddSupplierDto, IdTransformerDto, PaginationDto } from '@wow-spedoo/dto';
import { ApiKeyAuthGuard } from '@wow-spedoo/auth';

@Controller('supplier')
export class SupplierController {
  private readonly logger = new Logger(SupplierController.name);
  constructor(private readonly supplierService: SupplierService) {}


  @UseGuards(ApiKeyAuthGuard)
  @Post('add')
  async AddSupplier(addSupplierDto:AddSupplierDto,@Request() req){
    try{
      const {token} = req.headers;
      return await this.supplierService.addSupplier(addSupplierDto,token);
    }catch(err){
      this.logger.error(err);
    }
  }


  @UseGuards(ApiKeyAuthGuard)
  @Get(':id')
  async getSupplier(@Param() supplierId:IdTransformerDto,@Request() req){
    try{
      const {token} = req.headers;
      const {id} = supplierId;
      return await this.supplierService.getSupplier(id,token);
    }catch (err){
      this.logger.error(err);
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('many')
  async getManySupplier(@Query() pagination:PaginationDto,@Request() req){
    try {
      const { token } = req.headers;
      return await this.supplierService.getManySupplier(pagination,token);
    }catch(err){
      this.logger.error(err);
    }
  }

}
