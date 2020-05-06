import * as mongoose from 'mongoose';

export const serverSchema = new mongoose.Schema({
  serverId: String,
  lastBump: Date,
  advertisementChannel: String,
  description: String,
}, {
  timestamps: true,
});
