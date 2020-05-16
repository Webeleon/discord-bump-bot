import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { Client } from 'discord.js';
import { TopggService } from '../topgg/topgg.service';

@Injectable()
export class DiscordService {
  client: Client;
  ready: boolean;

  constructor(
    private readonly config: ConfigService,
    private readonly topGGService: TopggService,
  ) {}

  connect(): Client {
    this.client = new Client();

    this.client.on('ready', () => {
      Logger.log(`Discord connected with handle ${this.client.user.tag}`);
      this.topGGService.register(this.client.user.id);
      this.ready = true;
    });

    this.client.login(this.config.discordToken);
    return this.client;
  }
}
