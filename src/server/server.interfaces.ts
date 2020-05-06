import { Document } from 'mongoose';

export interface IServer {
  serverId: string;
  lastBump: Date;
  advertisementChannel: string;
  description: string;
}

export interface IServerDocument extends IServer, Document {};
