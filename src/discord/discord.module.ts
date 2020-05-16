import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { ConfigModule } from '../config/config.module';
import { BumpScheduled } from './scheduled/bump.scheduled';
import { ServerModule } from '../server/server.module';
import { BumpModule } from '../bump/bump.module';
import { MemberModule } from '../member/member.module';
import { TopggModule } from '../topgg/topgg.module';

@Module({
  imports: [ConfigModule, ServerModule, BumpModule, MemberModule, TopggModule],
  providers: [DiscordService, BumpScheduled],
  exports: [DiscordService],
  controllers: [DiscordController],
})
export class DiscordModule {}
