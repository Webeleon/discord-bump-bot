import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../../../interfaces/ICommandService';

@Injectable()
export class SetChannelService implements ICommandService {
  test(content: string): boolean {
    return /!setChannel.*/.test(content);
  }

  async execute(message: Message): Promise<void> {
    // TODO: implement
    Logger.debug('set channel command')
  }
}
