import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../../../interfaces/ICommandService';
import { ServerService } from '../../../server/server.service';

@Injectable()
export class SetDescriptionHandler implements ICommandService {
  constructor(private readonly serverService: ServerService) {}

  test(content: string): boolean {
    return /!setDescription.*/.test(content);
  }

  async execute(message: Message): Promise<void> {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    const description = message.content.replace('!setDescription', '').trim();
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
