import { Test, TestingModule } from '@nestjs/testing';
import { SetChannelHandler } from './set-channel-handler.service';

describe('SetChannelService', () => {
  let service: SetChannelHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetChannelHandler],
    }).compile();

    service = module.get<SetChannelHandler>(SetChannelHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
