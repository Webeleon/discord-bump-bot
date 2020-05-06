import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { BumpService } from './bump.service';
import { bumpSchema } from './bump.model';
import { ConfigService } from '../config/config.service';

describe('BumpService', () => {
  let service: BumpService;

  beforeEach(async () => {
    const config = new ConfigService();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(config.mongoURL, { useNewUrlParser: true }),
        MongooseModule.forFeature([{ name: 'Bump', schema: bumpSchema }]),
      ],
      providers: [BumpService],
    }).compile();

    service = module.get<BumpService>(BumpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
