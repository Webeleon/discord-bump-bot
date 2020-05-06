import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TextChannel } from 'discord.js';

import { ServerService } from '../../server/server.service';
import { BumpService } from '../../bump/bump.service';
import { DiscordService } from '../discord.service';
import { IBump } from '../../bump/bump.interfaces';
import { IServer } from '../../server/server.interfaces';

@Injectable()
export class ScheduledService {
  constructor(
    private readonly serverService: ServerService,
    private readonly bumpService: BumpService,
    private readonly discordService: DiscordService,
  ){}

  @Cron(CronExpression.EVERY_SECOND)
  async sendBumped() {
    const bumps = await this.bumpService.getBumps();
    if (bumps.length === 0) return;
    const servers = await this.serverService.getServers();

    Logger.debug(`sending ${bumps.length} to ${servers.length} servers`);

    for (const bump of bumps) {
      for (const server of servers) {
        await this.sendAdToServer(bump, server);
      }
      await this.bumpService.done(bump)
    }
  }

  async sendAdToServer(bump: IBump, server: IServer): Promise<void> {
    if (server.serverId === bump.serverId) return; // not sending the ad to the bumped server
    if (!server.advertisementChannel) {
      Logger.log(`Server ${server.serverId} have no advertisement set...`)
    }
    try {
      const channel = await this.discordService.client.channels.fetch(server.advertisementChannel);
      await (channel as TextChannel).send('BUMP')

    } catch (error) {
      Logger.error(error);
    }
  }
}
