import { Test } from '@nestjs/testing';
import { PickService } from './pick.service';

describe('PickService', () => {
  let service: PickService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PickService],
    }).compile();

    service = module.get(PickService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
