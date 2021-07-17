import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { AddDeliveryTaskDto, PaginationDto } from '@wow-spedoo/dto';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/auth';

@Controller('delivery')
export class DeliveryController {
  private readonly logger = new Logger(DeliveryController.name);
  constructor(private deliveryService: DeliveryService) {}

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('finished')
  async getFinishedTasks(@Query() paginationDto: PaginationDto) {
    try {
      return this.deliveryService.getFinishedTasks(paginationDto);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('unfinished')
  async getUnfinishedTasks(@Query() paginationDto: PaginationDto) {
    try {
      return this.deliveryService.getUnfinishedTasks(paginationDto);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async addTask(@Body() addDeliveryTaskDto: AddDeliveryTaskDto) {
    try {
      return this.deliveryService.addTask(addDeliveryTaskDto);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
