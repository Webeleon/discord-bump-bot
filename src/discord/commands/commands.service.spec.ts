import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandsService } from './commands.service';
import { ConfigModule } from '../../config/config.module';
import { ServerModule } from '../../server/server.module';
import { BumpModule } from '../../bump/bump.module';
import { MemberModule } from '../../member/member.module';
import { TopggModule } from '../../topgg/topgg.module';
import { DiscordService } from '../discord.service';
import { ConfigService } from '../../config/config.service';
import { BumpScheduled } from '../scheduled/bump.scheduled';
import { SetChannelHandler } from './set-channel/set-channel.handler';
import { SetDescriptionHandler } from './set-description/set-description.handler';
import { BumpHandler } from './bump/bump-handler.service';
import { InviteHandler } from './invite/invite.handler';
import { HelpHandler } from './help/help.handler';

describe('CommandsService', () => {
  let service: CommandsService;

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

    service = module.get<CommandsService>(CommandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
