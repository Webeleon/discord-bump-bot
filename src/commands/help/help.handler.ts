import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../../interfaces/ICommandService';

@Injectable()
export class HelpHandler implements ICommandService {
  test(content: string): boolean {
    return /!help/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.reply({
      embed: {
        title: 'Help page',
        description: '**Commands:**',
        fields: [
          {
            name: 'Join our support server if you got questions.',
            value: `
**\`!setchannel\` sets the advertisement channel**
alias: \`!setchan\`

**\`!setdescription <desc>\` sets the server advertisement**
alias: \`!setdesc <desc>\`

**\`!bump\` bumps the server, every 1 hour.**

**\`!invite\` shows link to invite bot to the server**

**\`!vote\` shows a link to google**
`,
          },
        ],
      },
    });
  }
}
