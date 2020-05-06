import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { SetDescriptionHandler } from './set-description-handler.service';
import { ServerModule } from '../../../server/server.module';
import { ConfigService } from '../../../config/config.service';

describe('SetDescriptionHandler', () => {
  let service: SetDescriptionHandler;

  beforeEach(async () => {
    const config = new ConfigService();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(config.mongoURL, { useNewUrlParser: true }),
        ServerModule,
      ],
      providers: [SetDescriptionHandler],
    }).compile();

    service = module.get<SetDescriptionHandler>(SetDescriptionHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
