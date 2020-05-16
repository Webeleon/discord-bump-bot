import { Controller, Get, Redirect } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Controller('discord')
export class DiscordController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/bot-invite')
  @Redirect('')
  invite() {
    const permissions = '1297473';
    const inviteUrl = this.configService.getInviteLink();
    return { url: inviteUrl };
  }
}
