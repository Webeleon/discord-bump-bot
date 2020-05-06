import { Test, TestingModule } from '@nestjs/testing';
import { SetDescriptionHandler } from './set-description-handler.service';

describe('SetDescriptionService', () => {
  let service: SetDescriptionHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetDescriptionHandler],
    }).compile();

    service = module.get<SetDescriptionHandler>(SetDescriptionHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
