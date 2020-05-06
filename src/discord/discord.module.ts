import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { CommandsService } from './commands/commands.service';
import { ScheduledService } from './scheduled/scheduled.service';
import { SetChannelService } from './commands/set-channel/set-channel.service';
import { SetDescriptionService } from './commands/set-description/set-description.service';
import { BumpService } from './commands/bump/bump.service';
import { ServerModule } from '../server/server.module';

@Module({
  imports: [ConfigModule, ServerModule],
  providers: [DiscordService, ConfigService, CommandsService, ScheduledService, SetChannelService, SetDescriptionService, BumpService],
  exports: [DiscordService],
  controllers: [DiscordController],
})
export class DiscordModule {}
