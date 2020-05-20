import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { SetDescriptionHandler } from './set-description.handler';
import { ServerModule } from '../../server/server.module';
import { ConfigService } from '../../config/config.service';

describe('SetDescriptionHandler', () => {
  let service: SetDescriptionHandler;

  beforeEach(async () => {
    const config = new ConfigService();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(config.mongoURL, { useNewUrlParser: true }),
        ServerModule,
      ],
      providers: [SetDescriptionHandler],
    }).compile();

    service = module.get<SetDescriptionHandler>(SetDescriptionHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should respond to !setDescription and !setdesc case insensitive', () => {
    expect(service.test('!setDescription')).toBeTruthy();
    expect(service.test('!setdescription')).toBeTruthy();
    expect(service.test('!SETDESCRIPTION')).toBeTruthy();
    expect(service.test('!setDesc')).toBeTruthy();
    expect(service.test('!setdesc')).toBeTruthy();
    expect(service.test('!SETDESC')).toBeTruthy();
    expect(service.test('something !SETDESC')).toBeFalsy();
  });
});
