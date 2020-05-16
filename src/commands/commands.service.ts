import { Injectable, Logger } from '@nestjs/common';
import { Client, Message } from 'discord.js';

import { ICommandService } from '../interfaces/ICommandService';
import { BumpHandler } from './bump/bump-handler.service';
import { SetChannelHandler } from './set-channel/set-channel.handler';
import { SetDescriptionHandler } from './set-description/set-description.handler';
import { InviteHandler } from './invite/invite.handler';
import { HelpHandler } from './help/help.handler';
import { VoteHandler } from './vote/vote.handler';

@Injectable()
export class CommandsService {
  commandHandlers: ICommandService[] = [];

  constructor(
    setChannel: SetChannelHandler,
    setDescription: SetDescriptionHandler,
    bump: BumpHandler,
    invite: InviteHandler,
    help: HelpHandler,
    vote: VoteHandler,
  ) {
    this.commandHandlers = [
      setChannel,
      setDescription,
      bump,
      help,
      invite,
      vote,
    ];
  }
  register(client: Client) {
    client.on('message', async message => await this.messageHandler(message));
  }

  async messageHandler(message: Message) {
    Logger.debug(message);
    if (message.author.bot) return;
    const { content } = message;
    for (const handler of this.commandHandlers) {
      if (handler.test(content)) {
        await handler.execute(message);
      }
    }
  }
}
