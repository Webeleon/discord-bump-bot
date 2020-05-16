import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '../config/config.module';
import { DiscordService } from './discord.service';
import { ConfigService } from '../config/config.service';
import { TopggModule } from '../topgg/topgg.module';
import { CommandsService } from './commands/commands.service';
import { SetChannelHandler } from './commands/set-channel/set-channel.handler';
import { SetDescriptionHandler } from './commands/set-description/set-description.handler';
import { BumpHandler } from './commands/bump/bump-handler.service';
import { ServerModule } from '../server/server.module';
import { BumpModule } from '../bump/bump.module';
import { MemberModule } from '../member/member.module';
import { BumpScheduled } from './scheduled/bump.scheduled';
import { InviteHandler } from './commands/invite/invite.handler';
import { HelpHandler } from './commands/help/help.handler';

describe('DiscordService', () => {
  let service: DiscordService;

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

    service = module.get<DiscordService>(DiscordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
