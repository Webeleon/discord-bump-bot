import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';
import { ICommandService } from '../../../interfaces/ICommandService';

@Injectable()
export class BumpService implements ICommandService {
  test(content: string): boolean {
    return /!bump/.test(content);
  }

  async execute(message: Message): Promise<void> {
    // TODO
    Logger.debug('bump command')
  }
}
