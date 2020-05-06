import { Document } from 'mongoose';

export interface IMember {
  memberId: string;
  haveAFreeBump: boolean;
  lastVote: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMemberDocument extends Document, IMember {}
