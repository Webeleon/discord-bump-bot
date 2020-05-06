import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TextChannel, Guild } from 'discord.js';

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

  @Cron(CronExpression.EVERY_SECOND)
  async sendBumped() {
    if (!this.discordService.ready) return;
    const bumps = await this.bumpService.getBumps();
    if (bumps.length === 0) return;
    const servers = await this.serverService.getServers();

    Logger.debug(`sending ${bumps.length} to ${servers.length} servers`);

    for (const bump of bumps) {
      try {
        const embed = await this.generateEmbed(bump);
        for (const server of servers) {
          await this.sendAdToServer(bump, server, embed);
        }
        await this.bumpService.done(bump);
      } catch (error) {
        Logger.error(
          `Error while sending ad: ${error.message}\n${error.stack}`,
        );
      }
    }
  }

  async generateEmbed(bump: IBump): Promise<any> {
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
      title: `:link: ${guild.name}`,
      description: server.description,
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
    };
  }

  async sendAdToServer(
    bump: IBump,
    server: IServer,
    embed: any,
  ): Promise<void> {
    if (server.serverId === bump.serverId) return; // not sending the ad to the bumped server
    if (!server.advertisementChannel) {
      Logger.log(`Server ${server.serverId} have no advertisement set...`);
    }
    try {
      const channel = await this.discordService.client.channels.fetch(
        server.advertisementChannel,
      );
      await (channel as TextChannel).send({ embed });
    } catch (error) {
      Logger.error(
        `Error while sending ad to server: ${server.serverId}\n${error.message}`,
      );
    }
  }
}
