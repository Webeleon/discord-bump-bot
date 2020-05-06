import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';
import { ICommandService } from '../../../interfaces/ICommandService';
import { ServerService } from '../../../server/server.service';
import { BumpService } from '../../../bump/bump.service';
import { MemberService } from '../../../member/member.service';

@Injectable()
export class BumpHandler implements ICommandService {
  constructor(
    private readonly serverService: ServerService,
    private readonly bumpService: BumpService,
    private readonly memberService: MemberService,
  ) {}
  test(content: string): boolean {
    return /!bump/.test(content);
  }

  async execute(message: Message): Promise<void> {
    Logger.debug(`Bump requested for server ${message.guild.id}`);
    const serverCanBeBumped = await this.serverService.canBeBumped(
      message.guild.id,
    );
    const memberHaveFreeBump = await this.memberService.hasFreeBump(
      message.author.id,
    );
    if (serverCanBeBumped) {
      await this.bumpService.registerBump(message.guild.id);
      await this.serverService.markAsBumped(message.guild.id);
      message.reply(
        'Your server has been successfully bumped!\n' +
          '**Vote for our bot to get a free bump, you can get a free bump every 12 hours by voting!**\n' +
          'Looking for support? join our support server!',
      );
    } else if (memberHaveFreeBump) {
      await this.bumpService.registerBump(message.guild.id);
      await this.memberService.consumeFreeBump(message.author.id);
      message.reply(
        'Your server has been successfully bumped!\n' +
          '**You can vote for our bot again in 12 hours and get a free bump again!**\n' +
          'Looking for support? join our support server!',
      );
    } else {
      message.reply(
        'Your bump has failed please try again, if the issue persists please join our support server to report the issue!',
      );
    }
  }
}
