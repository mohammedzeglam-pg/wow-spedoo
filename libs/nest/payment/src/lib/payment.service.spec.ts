import { Test } from '@nestjs/testing';
import { NestPaymentService } from './payment.service';

describe('NestPaymentService', () => {
  let service: NestPaymentService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestPaymentService],
    }).compile();

    service = module.get(NestPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
