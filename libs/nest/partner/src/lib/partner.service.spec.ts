import { Test } from '@nestjs/testing';
import { NestPartnerService } from './partner.service';

describe('NestPartnerService', () => {
  let service: NestPartnerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestPartnerService],
    }).compile();

    service = module.get(NestPartnerService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
