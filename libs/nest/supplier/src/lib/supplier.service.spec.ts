import { Test } from '@nestjs/testing';
import { NestSupplierService } from './supplier.service';

describe('NestSupplierService', () => {
  let service: NestSupplierService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestSupplierService],
    }).compile();

    service = module.get(NestSupplierService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
