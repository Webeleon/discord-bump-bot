import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { Client } from 'discord.js';
import { CommandsService } from './commands/commands.service';
import { TopggService } from '../topgg/topgg.service';

@Injectable()
export class DiscordService {
  client: Client;
  ready: boolean;

  constructor(
    private readonly config: ConfigService,
    private readonly commandService: CommandsService,
    private readonly topGGService: TopggService,
  ) {}

  connect() {
    this.client = new Client();

    this.client.on('ready', () => {
      Logger.log(`Discord connected with handle ${this.client.user.tag}`);
      this.commandService.register(this.client);
      this.topGGService.register(this.client.user.id);
      this.ready = true;
    });

    this.client.login(this.config.discordToken);
  }

  getInviteLink() {
    return `https://discordapp.com/api/oauth2/authorize?client_id=${this.config.discordClientId}&scope=bot&permissions=27681`;
  }
}
