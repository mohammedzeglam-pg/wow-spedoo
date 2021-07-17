import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PickService } from './pick.service';
import { AddPickTaskDto, PaginationDto } from '@wow-spedoo/dto';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/auth';

@Controller('pick')
export class PickController {
  private readonly logger = new Logger(PickController.name);
  constructor(private readonly pickService: PickService) {}

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('finished')
  async getFinishedPickTasks(@Query() paginationDto: PaginationDto) {
    try {
      return this.pickService.getFinishedPickTasks(paginationDto);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('unfinished')
  async getUnfinishedPickTasks(@Query() paginationDto: PaginationDto) {
    try {
      return this.pickService.getUnfinishedPickTasks(paginationDto);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async addPickTask(@Body() addPickTaskDto: AddPickTaskDto) {
    try {
      return this.pickService.addPickTask(addPickTaskDto);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
