import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger, Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { PickBoyService } from './pick-boy.service';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/auth';
import { PickBoyDecorator } from '@wow-spedoo/auth';
import { PaginationDto, UpdatePickStatusDto } from '@wow-spedoo/dto';

@Controller('pick-boy')
export class PickBoyController {
  private readonly logger = new Logger(PickBoyController.name);
  constructor(private pickBoyService: PickBoyService) {}

  @Roles(Role.PICKER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('completed')
  async getFinishedTasks(
    @PickBoyDecorator(ParseIntPipe) id,
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
    @PickBoyDecorator() id,
    @Param() paginationDto: PaginationDto,
  ) {
    try {
        // const {pick} =
         return  await this.pickBoyService.getUnfinishedTasks(id, paginationDto);
      // return pick;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }

  @Roles(Role.PICKER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update')
  async updateTaskStatus( @PickBoyDecorator(ParseIntPipe) id, @Body() task: UpdatePickStatusDto) {
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
