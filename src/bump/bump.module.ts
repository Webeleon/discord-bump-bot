import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BumpService } from './bump.service';
import { bumpSchema } from './bump.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Bump', schema: bumpSchema }
    ])
  ],
  providers: [BumpService],
  exports: [BumpService]
})
export class BumpModule {}
