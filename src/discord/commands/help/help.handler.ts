import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../../../interfaces/ICommandService';

@Injectable()
export class HelpHandler implements ICommandService {
  test(content: string): boolean {
    return /!help/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.reply({
      embed: {
        description: `
Join our support server if you got questions.

!setchannel sets the advertisment channel

!setdescription sets the server advertisement

!bump bumps the server, every 1 hour.

!invite shows link to invite bot to the server        
        `,
      },
    });
  }
}
