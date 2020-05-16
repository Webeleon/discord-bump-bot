import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../../../interfaces/ICommandService';

@Injectable()
export class VoteHandler implements ICommandService {
  test(content: string): boolean {
    return /!vote/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.reply({
      embed: {
        title: 'Link to google',
        url: 'https://google.com',
      },
    });
  }
}
