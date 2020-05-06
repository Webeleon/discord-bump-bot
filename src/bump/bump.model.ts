import * as mongoose from 'mongoose';

export const bumpSchema = new mongoose.Schema(
  {
    serverId: String,
  },
  {
    timestamps: true,
  },
);
