import { Test } from '@nestjs/testing';
import { NestOrderController } from './order.controller';
import { NestOrderService } from './order.service';

describe('NestOrderController', () => {
  let controller: NestOrderController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestOrderService],
      controllers: [NestOrderController],
    }).compile();

    controller = module.get(NestOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
