import { Test, TestingModule } from '@nestjs/testing';
import { SetDescriptionService } from './set-description.service';

describe('SetDescriptionService', () => {
  let service: SetDescriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetDescriptionService],
    }).compile();

    service = module.get<SetDescriptionService>(SetDescriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
