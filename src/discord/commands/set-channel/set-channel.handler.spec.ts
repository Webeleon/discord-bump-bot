import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { SetChannelHandler } from './set-channel-handler.service';
import { ServerModule } from '../../../server/server.module';
import { ConfigService } from '../../../config/config.service';

describe('SetChannelHandler', () => {
  let service: SetChannelHandler;

  beforeEach(async () => {
    const config = new ConfigService();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(config.mongoURL, { useNewUrlParser: true }),
        ServerModule,
      ],
      providers: [SetChannelHandler],
    }).compile();

    service = module.get<SetChannelHandler>(SetChannelHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
