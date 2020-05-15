import { Document } from 'mongoose';

export interface IBump {
  serverId: string;
  retries: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBumpDocument extends IBump, Document {}
