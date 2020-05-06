import * as mongoose from 'mongoose';

export const memberSchema = new mongoose.Schema(
  {
    memberId: String,
    haveAFreeBump: Boolean,
    lastVote: Date,
  },
  {
    timestamps: true,
  },
);
