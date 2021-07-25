import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Patch, Query,
  UseGuards,
} from '@nestjs/common';
import { DeliveryBoyService } from './delivery-boy.service';
import {
  DeliveryBoyDecorator,
  JwtAuthGuard,
  Role,
  Roles,
  RolesGuard,
} from '@wow-spedoo/auth';
import { PaginationDto, UpdateDeliveryDto } from '@wow-spedoo/dto';

@Controller('delivery-boy')
export class DeliveryBoyController {
  private readonly logger = new Logger(DeliveryBoyController.name);
  constructor(private deliveryBoyService: DeliveryBoyService) {}

  @Roles(Role.DELIVERY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('completed')
  async getFinishedTasks(
    @DeliveryBoyDecorator() id,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return this.deliveryBoyService.getFinishedTasks(id, paginationDto);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }

  @Roles(Role.DELIVERY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('work')
  async getUnfinishedTasks(
    @DeliveryBoyDecorator() id,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return this.deliveryBoyService.getUnfinshedTasks(id, paginationDto);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }

  @Roles(Role.DELIVERY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update')
  async updateTaskStatus(
    @DeliveryBoyDecorator() id,
    @Body() task: UpdateDeliveryDto,
  ) {
    try {
      return this.deliveryBoyService.updateTask(id, task);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }
}
