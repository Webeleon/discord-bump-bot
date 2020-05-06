import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { BumpHandler } from './bump-handler.service';
import { ServerModule } from '../../../server/server.module';
import { ConfigService } from '../../../config/config.service';
import { BumpModule } from '../../../bump/bump.module';
import { MemberModule } from '../../../member/member.module';

describe('BumpHandler', () => {
  let service: BumpHandler;

  beforeEach(async () => {
    const config = new ConfigService();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(config.mongoURL, { useNewUrlParser: true }),
        ServerModule,
        BumpModule,
        MemberModule,
      ],
      providers: [BumpHandler],
    }).compile();

    service = module.get<BumpHandler>(BumpHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
