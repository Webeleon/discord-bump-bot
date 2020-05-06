import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';
import { ICommandService } from '../../../interfaces/ICommandService';
import { ServerService } from '../../../server/server.service';
import { BumpService } from '../../../bump/bump.service';

@Injectable()
export class BumpHandler implements ICommandService {
  constructor(
    private readonly serverService: ServerService,
    private readonly bumpService: BumpService,
  ) {}
  test(content: string): boolean {
    return /!bump/.test(content);
  }

  async execute(message: Message): Promise<void> {
    Logger.debug(`Bump requested for server ${message.guild.id}`);
    const serverCanBeBumped = await this.serverService.canBeBumped(message.guild.id);
    const userHaveFreeBump = false;
    if (serverCanBeBumped) {
      await this.bumpService.registerBump(message.guild.id);
      await this.serverService.markAsBumped(message.guild.id);
      message.reply('MESSAGE FOR SUCCESSFUL BUMP')
    } else if (userHaveFreeBump) {
      await this.bumpService.registerBump(message.guild.id);
      message.reply('MESSAGE FOR FREE BUMP')
    } else {
      message.reply('MESSAGE NOT BUMPABLE, upvote the bot on top.gg or come back in X')
    }
  }
}
