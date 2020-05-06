import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { TopggService } from './topgg.service';
import { ConfigModule } from '../config/config.module';
import { MemberModule } from '../member/member.module';
import { ConfigService } from '../config/config.service';

describe('TopggService', () => {
  let service: TopggService;

  beforeEach(async () => {
    const config = new ConfigService();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        MemberModule,
        MongooseModule.forRoot(config.mongoURL),
      ],
      providers: [TopggService],
    }).compile();

    service = module.get<TopggService>(TopggService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
