import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';

import { IServerDocument } from './server.interfaces';

const BUMP_INTERVAL_UNIT = 'hours';
@Injectable()
export class ServerService {
  constructor(
    @InjectModel('Server') private serverModel: Model<IServerDocument>,
  ) {}

  async setDescription(serverId: string, description: string): Promise<void> {
    const server = await this.getServer(serverId);
    server.description = description;
    await server.save();
  }

  async setChannel(serverId: string, channelId: string): Promise<void> {
    const server = await this.getServer(serverId);
    server.advertisementChannel = channelId;
    await server.save();
  }

  async canBeBumped(serverId: string): Promise<boolean | string> {
    const server = await this.getServer(serverId);
    if (!server.lastBump) return true;
    if (moment() > moment(server.lastBump).add(1, BUMP_INTERVAL_UNIT)) {
      return true;
    }
    return false;
  }

  async nextBumpIn(serverId: string): Promise<string> {
    const server = await this.getServer(serverId);
    return moment(server.lastBump)
      .add(1, BUMP_INTERVAL_UNIT)
      .fromNow();
  }

  async markAsBumped(serverId: string): Promise<void> {
    const server = await this.getServer(serverId);
    server.lastBump = new Date();
    await server.save();
  }

  async getServers(): Promise<IServerDocument[]> {
    return this.serverModel.find({});
  }

  async getServer(serverId: string): Promise<IServerDocument> {
    const guild = await this.serverModel.findOne({ serverId });
    if (!guild) {
      return await this.serverModel.create({
        serverId: serverId,
      });
    }
    return guild;
  }
}
