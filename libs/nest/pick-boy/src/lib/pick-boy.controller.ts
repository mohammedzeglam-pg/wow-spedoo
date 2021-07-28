import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { NestPickBoyService } from './pick-boy.service';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/nest/auth';
import { NestPickBoyDecorator } from '@wow-spedoo/nest/auth';
import { PaginationDto, UpdatePickStatusDto } from '@wow-spedoo/nest/dto';

@Controller('pick-boy')
export class NestPickBoyController {
  private readonly logger = new Logger(NestPickBoyController.name);
  constructor(private pickBoyService: NestPickBoyService) {}

  @Roles(Role.PICKER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('completed')
  async getFinishedTasks(
    @NestPickBoyDecorator(ParseIntPipe) id,
    @Param() paginationDto: PaginationDto,
  ) {
    try {
      return this.pickBoyService.getFinishedTasks(id, paginationDto);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }

  @Roles(Role.PICKER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('work')
  async getUnfinishedTasks(
    @NestPickBoyDecorator() id,
    @Param() paginationDto: PaginationDto,
  ) {
    try {
      // const {pick} =
      return await this.pickBoyService.getUnfinishedTasks(id, paginationDto);
      // return pick;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }

  @Roles(Role.PICKER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update')
  async updateTaskStatus(
    @NestPickBoyDecorator(ParseIntPipe) id,
    @Body() task: UpdatePickStatusDto,
  ) {
    try {
      const { productId, note, status } = task;
      return this.pickBoyService.updateTaskStatus(
        id,
        { note, status },
        productId,
      );
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }
}
