import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';

import { IServerDocument } from './server.interfaces';

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
    if (moment() > moment(server.lastBump).add(1, 'hours')) {
      return true;
    }
    return false;
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