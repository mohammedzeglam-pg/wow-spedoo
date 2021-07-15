import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post, Query,
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
  async getOrderDetails(@Param() orderIdentifier:IdTransformerDto,@Request() req){
    try{
      const {id} = orderIdentifier;
      const {token} = req.headers;
      return await this.orderService.getOrderDetails(id,token);
    }catch(err){
      this.logger.error(err)
    }
  }

  @Get('pricing')
  async getPricing(@Query() location:{lat:number;lon:number}){
    const price = await this.orderService.getPricing(location);
    if(!price){
      return  new HttpException('حاليا غير متوفر',HttpStatus.NOT_FOUND);
    }
  }

}
