import { Test } from '@nestjs/testing';
import { NestPickService } from './pick.service';

describe('NestPickService', () => {
  let service: NestPickService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestPickService],
    }).compile();

    service = module.get(NestPickService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
