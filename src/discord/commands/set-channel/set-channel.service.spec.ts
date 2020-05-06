import { Test, TestingModule } from '@nestjs/testing';
import { SetChannelService } from './set-channel.service';

describe('SetChannelService', () => {
  let service: SetChannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetChannelService],
    }).compile();

    service = module.get<SetChannelService>(SetChannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
