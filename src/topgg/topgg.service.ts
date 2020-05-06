import { Injectable, Logger } from '@nestjs/common';
import * as TopGG from 'dblapi.js';

import { ConfigService } from '../config/config.service';
import { MemberService } from '../member/member.service';

@Injectable()
export class TopggService {
  private botId: string;
  constructor(
    private readonly config: ConfigService,
    private readonly memberService: MemberService,
  ) {}

  register(botId: string) {
    this.botId = botId;
    const topGGClient = new TopGG(this.config.topGGToken, {
      webhookPort: this.config.topGGHookPort,
      webhookAuth: this.config.topGGHookPassword,
    });

    topGGClient.webhook.on('ready', (hook: any) => {
      Logger.log(
        `Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`,
      );
    });
    topGGClient.webhook.on('vote', async (vote: any) => {
      Logger.log(`User with Id ${vote.user} as voted!`);
      if (vote.bot === botId) {
        await this.memberService.vote(vote.user);
      }
    });
  }
}
