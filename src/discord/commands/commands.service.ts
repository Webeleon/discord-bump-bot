import { Injectable } from '@nestjs/common';
import { Client, Message } from 'discord.js';

import { ICommandService } from '../../interfaces/ICommandService';
import { BumpService } from './bump/bump.service';
import { SetChannelService } from './set-channel/set-channel.service';
import { SetDescriptionService } from './set-description/set-description.service';

@Injectable()
export class CommandsService {
  commandHandlers: ICommandService[] = [];

  constructor(
    setChannel: SetChannelService,
    setDescription: SetDescriptionService,
    bumpService: BumpService
  ) {
    this.commandHandlers = [
      setChannel, setDescription, bumpService,
    ]
  }
  register(client: Client) {
    client.on('message', async message => await this.messageHandler(message));
  }

  async messageHandler(message: Message) {
    if (message.author.bot) return;
    const { content } = message;
    for (const handler of this.commandHandlers) {
      if (handler.test(content)) {
        await handler.execute(message);
      }
    }
  }
}
