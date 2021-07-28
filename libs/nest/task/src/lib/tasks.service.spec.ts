import { Test } from '@nestjs/testing';
import { NestTaskService } from './tasks.service';

describe('NestTaskService', () => {
  let service: NestTaskService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestTaskService],
    }).compile();

    service = module.get(NestTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
