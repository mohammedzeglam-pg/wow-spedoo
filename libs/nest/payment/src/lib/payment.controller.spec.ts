import { Test } from '@nestjs/testing';
import { NestPaymentController } from './payment.controller';
import { NestPaymentService } from './payment.service';

describe('NestPaymentController', () => {
  let controller: NestPaymentController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestPaymentService],
      controllers: [NestPaymentController],
    }).compile();

    controller = module.get(NestPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
