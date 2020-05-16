import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../../../interfaces/ICommandService';
import { ConfigService } from '../../../config/config.service';

@Injectable()
export class InviteHandler implements ICommandService {
  constructor(private readonly config: ConfigService) {}

  test(content: string): boolean {
    return /!invite/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    const botInviteLink = `https://discordapp.com/api/oauth2/authorize?client_id=${this.config.discordClientId}&scope=bot&permissions=27681`;
    message.reply({
      embed: {
        title: botInviteLink,
        url: botInviteLink,
      },
    });
  }
}
