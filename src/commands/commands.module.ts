import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { HelpHandler } from './help/help.handler';
import { BumpHandler } from './bump/bump-handler.service';
import { InviteHandler } from './invite/invite.handler';
import { SetChannelHandler } from './set-channel/set-channel.handler';
import { SetDescriptionHandler } from './set-description/set-description.handler';
import { VoteHandler } from './vote/vote.handler';
import { ConfigModule } from '../config/config.module';
import { MemberModule } from '../member/member.module';
import { ServerModule } from '../server/server.module';
import { BumpModule } from '../bump/bump.module';

@Module({
  imports: [ConfigModule, MemberModule, ServerModule, BumpModule],
  providers: [
    CommandsService,
    BumpHandler,
    HelpHandler,
    InviteHandler,
    SetChannelHandler,
    SetDescriptionHandler,
    VoteHandler,
  ],
  exports: [CommandsService],
})
export class CommandsModule {}
