import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { CommandsService } from './commands/commands.service';
import { BumpScheduled } from './scheduled/bump.scheduled';
import { SetChannelHandler } from './commands/set-channel/set-channel-handler.service';
import { SetDescriptionHandler } from './commands/set-description/set-description-handler.service';
import { BumpHandler } from './commands/bump/bump-handler.service';
import { ServerModule } from '../server/server.module';
import { BumpModule } from '../bump/bump.module';
import { MemberModule } from '../member/member.module';
import { TopggModule } from '../topgg/topgg.module';

@Module({
  imports: [ConfigModule, ServerModule, BumpModule, MemberModule, TopggModule],
  providers: [
    DiscordService,
    ConfigService,
    CommandsService,
    BumpScheduled,
    SetChannelHandler,
    SetDescriptionHandler,
    BumpHandler,
  ],
  exports: [DiscordService],
  controllers: [DiscordController],
})
export class DiscordModule {}
