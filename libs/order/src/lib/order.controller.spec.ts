import { Test } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [OrderService],
      controllers: [OrderController],
    }).compile();

    controller = module.get(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
