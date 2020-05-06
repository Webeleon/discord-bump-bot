import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../../../interfaces/ICommandService';
import { ServerService } from '../../../server/server.service';

@Injectable()
export class SetDescriptionHandler implements ICommandService {
  constructor(
    private readonly serverService: ServerService
  ) {}

  test(content: string): boolean {
    return /!setDescription.*/.test(content);
  }

  async execute(message: Message): Promise<void> {
    const [_, description] = message.content.match(/!setDescription (.*)/);
    Logger.debug(`Setting description for server ${message.guild.id} to: ${description}`);
    // Any restrictions?
    await this.serverService.setDescription(message.guild.id, description);
    message.reply(`You've just set the server description to: 
${description}
    `)
  }
}
