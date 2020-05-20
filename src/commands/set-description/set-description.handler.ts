import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../../interfaces/ICommandService';
import { ServerService } from '../../server/server.service';

@Injectable()
export class SetDescriptionHandler implements ICommandService {
  constructor(private readonly serverService: ServerService) {}

  test(content: string): boolean {
    return /^!set(-)?Desc(ription)?.*/i.test(content);
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
    const description = message.content
      .replace(/!set(-)?Desc(ription)?/i, '')
      .trim();
    if (description.length === 0) {
      message.reply({
        embed: {
          description:
            'You can not set an empty description.',
        },
      });
      return;
    }
    Logger.debug(
      `Setting description for server ${message.guild.id} to: ${description}`,
    );

    await this.serverService.setDescription(message.guild.id, description);
    message.reply({
      embed: {
        description: `You've just set the server description to: 
${description}`,
      },
    });
  }
}
