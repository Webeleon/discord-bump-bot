import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../../../interfaces/ICommandService';

@Injectable()
export class InviteHandler implements ICommandService {
  test(content: string): boolean {
    return /!invite/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.reply('TODO: implement');
  }
}
