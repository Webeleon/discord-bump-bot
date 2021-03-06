import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../../interfaces/ICommandService';
import { ServerService } from '../../server/server.service';

@Injectable()
export class SetChannelHandler implements ICommandService {
  constructor(private readonly serverService: ServerService) {}

  test(content: string): boolean {
    return /^!set(-)?Chan(nel)?.*/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    if (!message.member.hasPermission('MANAGE_GUILD')) {
      message.reply({
        embed: {
          description:
            'You need MANAGE_GUILD (Manage Server) permission to use this command!',
        },
      });
      return;
    }
    Logger.debug(
      `Setting channel ${message.channel.id} for server ${message.guild.id}`,
    );

    await this.serverService.setChannel(message.guild.id, message.channel.id);
    message.reply({
      embed: {
        description: `You've just set the advertisement channel to the current channel`,
      },
    });
  }
}
