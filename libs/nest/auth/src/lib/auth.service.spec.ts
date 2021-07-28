import { Test } from '@nestjs/testing';
import { NestAuthService } from './auth.service';

describe('NestAuthService', () => {
  let service: NestAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestAuthService],
    }).compile();

    service = module.get(NestAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
