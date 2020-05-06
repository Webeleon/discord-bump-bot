import { Injectable } from '@nestjs/common';
import { Client, Message } from 'discord.js';

import { ICommandService } from '../../interfaces/ICommandService';
import { BumpHandler } from './bump/bump-handler.service';
import { SetChannelHandler } from './set-channel/set-channel-handler.service';
import { SetDescriptionHandler } from './set-description/set-description-handler.service';

@Injectable()
export class CommandsService {
  commandHandlers: ICommandService[] = [];

  constructor(
    setChannel: SetChannelHandler,
    setDescription: SetDescriptionHandler,
    bumpService: BumpHandler
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
