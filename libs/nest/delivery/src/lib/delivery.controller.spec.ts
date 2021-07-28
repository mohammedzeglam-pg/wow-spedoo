import { Test } from '@nestjs/testing';
import { NestDeliveryController } from './delivery.controller';
import { NestDeliveryService } from './delivery.service';

describe('NestDeliveryController', () => {
  let controller: NestDeliveryController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestDeliveryService],
      controllers: [NestDeliveryController],
    }).compile();

    controller = module.get(NestDeliveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
