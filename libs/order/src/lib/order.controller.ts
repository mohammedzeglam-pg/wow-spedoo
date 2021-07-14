import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, IdTransformerDto } from '@wow-spedoo/dto';
import { ApiKeyAuthGuard } from '@wow-spedoo/auth';

@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(ApiKeyAuthGuard)
  @Post('add')
  async addOrder(@Body() createOrder:CreateOrderDto,@Request() req) {
    try{
    const {token} = req.headers;
    return await this.orderService.addOrder(createOrder,token);
    }
    catch (err){
      this.logger.error(err);
      throw new HttpException({
        status: HttpStatus.NOT_ACCEPTABLE,
        error: 'This is a custom message',
      }, HttpStatus.NOT_ACCEPTABLE);
    }
  }


  @UseGuards(ApiKeyAuthGuard)
  @Get(':id')
  async getOrderDetails(@Param() orderIdintifer:IdTransformerDto,@Request() req){
    try{
      const {id} = orderIdintifer;
      const {token} = req.headers;
      return await this.orderService.getOrderDetails(id,token);
    }catch(err){
      this.logger.error(err)
    }
  }



}
