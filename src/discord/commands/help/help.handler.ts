import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../../../interfaces/ICommandService';

@Injectable()
export class HelpHandler implements ICommandService {
  test(content: string): boolean {
    return /!help/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.reply('TODO: IMPLEMENT');
  }
}
