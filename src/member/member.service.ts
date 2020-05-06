import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IMemberDocument } from './member.interfaces';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private memberModel: Model<IMemberDocument>,
  ) {}

  async hasFreeBump(memberId: string): Promise<boolean> {
    const member = await this.getMember(memberId);
    return member.haveAFreeBump;
  }

  async consumeFreeBump(memberId: string): Promise<void> {
    await this.memberModel.updateOne(
      { memberId },
      {
        $set: {
          haveAFreeBump: false,
        },
      },
    );
  }

  async vote(memberId: string): Promise<void> {
    const member = await this.getMember(memberId);
    member.haveAFreeBump = true;
    member.lastVote = new Date();
    await member.save();
  }

  async getMember(memberId: string): Promise<IMemberDocument> {
    const member = await this.memberModel.findOne({ memberId });
    if (!member) {
      return this.memberModel.create({
        memberId,
        haveAFreeBump: false,
      });
    }
    return member;
  }
}
