import { Test } from '@nestjs/testing';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

describe('DeliveryController', () => {
  let controller: DeliveryController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DeliveryService],
      controllers: [DeliveryController],
    }).compile();

    controller = module.get(DeliveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
