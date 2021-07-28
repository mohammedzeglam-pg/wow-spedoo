import { Test } from '@nestjs/testing';
import { NestUserController } from './user.controller';
import { NestUserService } from './user.service';

describe('NestUserController', () => {
  let controller: NestUserController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestUserService],
      controllers: [NestUserController],
    }).compile();

    controller = module.get(NestUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
