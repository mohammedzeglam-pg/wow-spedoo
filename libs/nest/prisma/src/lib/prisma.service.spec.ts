import { Test } from '@nestjs/testing';
import { NestPrismaService } from './prisma.service';

describe('NestPrismaService', () => {
  let service: NestPrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestPrismaService],
    }).compile();

    service = module.get(NestPrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
