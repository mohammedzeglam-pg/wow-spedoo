import { Test } from '@nestjs/testing';
import { NestPickController } from './pick.controller';
import { NestPickService } from './pick.service';

describe('NestPickController', () => {
  let controller: NestPickController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestPickService],
      controllers: [NestPickController],
    }).compile();

    controller = module.get(NestPickController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
