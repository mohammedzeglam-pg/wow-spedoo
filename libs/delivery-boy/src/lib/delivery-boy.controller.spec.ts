import { Test } from '@nestjs/testing';
import { DeliveryBoyController } from './delivery-boy.controller';
import { DeliveryBoyService } from './delivery-boy.service';

describe('DeliveryBoyController', () => {
  let controller: DeliveryBoyController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DeliveryBoyService],
      controllers: [DeliveryBoyController],
    }).compile();

    controller = module.get(DeliveryBoyController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
