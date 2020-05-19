import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TextChannel } from 'discord.js';

import { ServerService } from '../../server/server.service';
import { BumpService } from '../../bump/bump.service';
import { DiscordService } from '../discord.service';
import { IBump } from '../../bump/bump.interfaces';
import { IServer } from '../../server/server.interfaces';

@Injectable()
export class BumpScheduled {
  constructor(
    private readonly serverService: ServerService,
    private readonly bumpService: BumpService,
    private readonly discordService: DiscordService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async sendBumped() {
    if (!this.discordService.ready) return;
    const bumps = await this.bumpService.getBumps();
    if (bumps.length === 0) return;
    const servers = await this.serverService.getServers();

    Logger.debug(`sending ${bumps.length} to ${servers.length} servers`);

    for (const bump of bumps) {
      const isServerAccessible = await this.isServerAccessible(bump.serverId);
      if (!isServerAccessible) {
        await this.bumpService.registerRetry(bump);
        continue;
      }
      try {
        const message = await this.generateMessage(bump);
        for (const server of servers) {
          await this.sendAdToServer(bump, server, message);
        }
        await this.bumpService.done(bump);
      } catch (error) {
        Logger.error(
          `Error while sending ad: ${error.message}\n${error.stack}`,
        );
      }
    }
  }

  async generateMessage(bump: IBump): Promise<any> {
    const server = await this.serverService.getServer(bump.serverId);
    const guild = await this.discordService.client.guilds.resolve(
      bump.serverId,
    );

    const invite = await guild.channels
      .resolve(server.advertisementChannel)
      .createInvite({});

    const members = await guild.members.fetch();
    const online = members.filter(m => m.presence.status === 'online').size;
    const idle = members.filter(m => m.presence.status === 'idle').size;
    const doNotDisturb = members.filter(m => m.presence.status === 'dnd').size;
    const bots = members.filter(m => !!m.user.bot).size;
    const humans = members.filter(m => !m.user.bot).size;

    const roles = await guild.roles.cache.size;
    const channels = await guild.channels.cache.size;
    const emojis = await guild.emojis.cache;
    const emojisDemo =
      Array.from(emojis)
        .slice(0, 10)
        .map(([id, emoji]) => `<:${emoji.name}:${id}>`) +
      `${emojis.size > 10 ? '...' : ''}`;

    return {
      embed: {
        description: `${guild.name}
        
  ${server.description.replace(/\\n/g, '\n')}
        
:link: **[Join server](${invite.url})**        
        `,
        url: invite.url,
        thumbnail: {
          url: await guild.iconURL(),
        },
        image: {
          url: await guild.bannerURL(),
        },
        fields: [
          {
            name: `:family_mwgb: Members \`${guild.memberCount}\``,
            value: `Online \`${online}\` | Idle: \`${idle}\` | Do Not Disturb: \`${doNotDisturb}\``,
          },
          {
            name: `:grey_exclamation: Misc`,
            value: `Roles: \`${roles}\` | Channels: \`${channels}\` | Bots: \`${bots}\` | Humans: \`${humans}\``,
          },
          {
            name: `:smiley: Total Emojis \`${emojis.size}\``,
            value: emojisDemo || ':person_shrugging:',
          },
        ],
        timestamp: new Date(),
      },
    };
  }

  async isServerAccessible(serverId: string): Promise<boolean> {
    const guild = await this.discordService.client.guilds.resolve(serverId);
    return !!guild;
  }

  async sendAdToServer(
    bump: IBump,
    server: IServer,
    message: any,
  ): Promise<void> {
    if (server.serverId === bump.serverId) return; // not sending the ad to the bumped server
    if (!server.advertisementChannel) {
      Logger.log(`Server ${server.serverId} have no advertisement set...`);
    }
    try {
      const channel = await this.discordService.client.channels.fetch(
        server.advertisementChannel,
      );
      if (!channel) return;
      await (channel as TextChannel).send(message);
    } catch (error) {
      Logger.error(
        `Error while sending ad to server: ${server.serverId}\n${error.message}`,
      );
    }
  }
}
