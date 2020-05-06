import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../../../interfaces/ICommandService';

@Injectable()
export class SetDescriptionService implements ICommandService {
  test(content: string): boolean {
    return /!setDescription.*/.test(content);
  }

  async execute(message: Message): Promise<void> {
    // TODO
    Logger.debug('set description command')
  }
}
