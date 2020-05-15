import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBump, IBumpDocument } from './bump.interfaces';

@Injectable()
export class BumpService {
  constructor(@InjectModel('Bump') private bumpModel: Model<IBumpDocument>) {}

  async registerBump(serverId: string): Promise<void> {
    await this.bumpModel.create({
      serverId,
      retry: 0,
    });
  }

  async getBumps(count = 3): Promise<IBump[]> {
    return this.bumpModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(count);
  }

  async done(bump: IBump): Promise<void> {
    await this.bumpModel.deleteMany({
      serverId: bump.serverId,
    });
  }

  async registerRetry(bump: IBump): Promise<void> {
    if (bump.retries == 1) {
      await this.done(bump);
    }
    await this.bumpModel.findOneAndUpdate(
      { serverId: bump.serverId },
      {
        $set: {
          retries: 1,
        },
      },
    );
  }
}
