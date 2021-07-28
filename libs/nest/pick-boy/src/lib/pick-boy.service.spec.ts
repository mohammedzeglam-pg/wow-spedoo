import { Test } from '@nestjs/testing';
import { NestPickBoyService } from './pick-boy.service';

describe('NestPickBoyService', () => {
  let service: NestPickBoyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestPickBoyService],
    }).compile();

    service = module.get(NestPickBoyService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
