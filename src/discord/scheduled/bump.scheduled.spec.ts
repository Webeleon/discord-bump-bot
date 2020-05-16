import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { BumpScheduled } from './bump.scheduled';
import { ConfigModule } from '../../config/config.module';
import { ServerModule } from '../../server/server.module';
import { BumpModule } from '../../bump/bump.module';
import { MemberModule } from '../../member/member.module';
import { TopggModule } from '../../topgg/topgg.module';
import { DiscordService } from '../discord.service';
import { ConfigService } from '../../config/config.service';
import { CommandsService } from '../commands/commands.service';
import { SetChannelHandler } from '../commands/set-channel/set-channel.handler';
import { SetDescriptionHandler } from '../commands/set-description/set-description.handler';
import { BumpHandler } from '../commands/bump/bump-handler.service';
import { InviteHandler } from '../commands/invite/invite.handler';
import { HelpHandler } from '../commands/help/help.handler';

describe('BumpScheduledService', () => {
  let service: BumpScheduled;

  beforeEach(async () => {
    const config = new ConfigService();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(config.mongoURL, { useNewUrlParser: true }),
        ConfigModule,
        ServerModule,
        BumpModule,
        MemberModule,
        TopggModule,
      ],
      providers: [
        DiscordService,
        ConfigService,
        CommandsService,
        BumpScheduled,
        SetChannelHandler,
        SetDescriptionHandler,
        BumpHandler,
        InviteHandler,
        HelpHandler,
      ],
    }).compile();

    service = module.get<BumpScheduled>(BumpScheduled);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
