import { Test, TestingModule } from '@nestjs/testing';
import { TopggService } from './topgg.service';

describe('TopggService', () => {
  let service: TopggService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopggService],
    }).compile();

    service = module.get<TopggService>(TopggService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
