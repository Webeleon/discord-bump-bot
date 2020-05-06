import { Module } from '@nestjs/common';
import { TopggService } from './topgg.service';
import { ConfigModule } from '../config/config.module';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [ConfigModule, MemberModule],
  providers: [TopggService],
  exports: [TopggService],
})
export class TopggModule {}
