import { Test } from '@nestjs/testing';
import { NestUserService } from './user.service';

describe('NestUserService', () => {
  let service: NestUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestUserService],
    }).compile();

    service = module.get(NestUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
