import { Test, TestingModule } from '@nestjs/testing';
import { BumpHandler } from './bump-handler.service';

describe('BumpService', () => {
  let service: BumpHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BumpHandler],
    }).compile();

    service = module.get<BumpHandler>(BumpHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
