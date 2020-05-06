import { Test, TestingModule } from '@nestjs/testing';
import { BumpService } from './bump.service';

describe('BumpService', () => {
  let service: BumpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BumpService],
    }).compile();

    service = module.get<BumpService>(BumpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
