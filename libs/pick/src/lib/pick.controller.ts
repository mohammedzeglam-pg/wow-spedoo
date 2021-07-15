import { Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { PickService } from './pick.service';
import { AddPickTaskDto, PaginationDto } from '@wow-spedoo/dto';

@Controller('pick')
export class PickController {
  private readonly logger = new Logger(PickController.name);
  constructor(private pickService: PickService) {}


  @Get('finished')
  async getFinishedTasks(@Query() paginationDto:PaginationDto){
    try{
      return this.pickService.getFinishedTasks(paginationDto);
    }catch(err){
      this.logger.error(err);
    }
  }

  @Get('finished')
  async getUnfinishedTasks(@Query() paginationDto:PaginationDto){
    try{
      return this.pickService.getUnfinishedTasks(paginationDto);
    }catch(err){
      this.logger.error(err);
    }
  }

  @Post('add')
  async addTask(addPickTaskDto:AddPickTaskDto){
    try{
      return this.pickService.addTask(addPickTaskDto);
    }catch(err){
      this.logger.error(err);
    }
  }

}
