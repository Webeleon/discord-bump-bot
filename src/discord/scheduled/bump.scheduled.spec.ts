import { Test, TestingModule } from '@nestjs/testing';
import { BumpScheduled } from './bump.scheduled';

describe('ScheduledService', () => {
  let service: BumpScheduled;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BumpScheduled],
    }).compile();

    service = module.get<BumpScheduled>(BumpScheduled);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
