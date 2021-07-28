import { Test } from '@nestjs/testing';
import { NestTaskController } from './tasks.controller';
import { NestTaskService } from './tasks.service';

describe('NestTaskController', () => {
  let controller: NestTaskController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestTaskService],
      controllers: [NestTaskController],
    }).compile();

    controller = module.get(NestTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
