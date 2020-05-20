import { Test, TestingModule } from '@nestjs/testing';
import { VoteHandler } from './vote.handler';

describe('VoteHandler', () => {
  let service: VoteHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoteHandler],
    }).compile();

    service = module.get<VoteHandler>(VoteHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should test on !vote case insensitive', () => {
    expect(service.test('!vote')).toBeTruthy();
    expect(service.test('!VOTE')).toBeTruthy();
    expect(service.test('something !VOTE')).toBeFalsy();
  });
});
