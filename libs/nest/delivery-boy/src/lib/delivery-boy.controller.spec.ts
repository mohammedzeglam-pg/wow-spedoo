import { Test } from '@nestjs/testing';
import { NestDeliveryBoyController } from './delivery-boy.controller';
import { NestDeliveryBoyService } from './delivery-boy.service';

describe('NestDeliveryBoyController', () => {
  let controller: NestDeliveryBoyController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestDeliveryBoyService],
      controllers: [NestDeliveryBoyController],
    }).compile();

    controller = module.get(NestDeliveryBoyController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
