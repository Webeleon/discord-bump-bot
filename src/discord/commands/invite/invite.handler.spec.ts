import { Test, TestingModule } from '@nestjs/testing';
import { InviteHandler } from './invite.handler';

describe('InviteHandler', () => {
  let service: InviteHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InviteHandler],
    }).compile();

    service = module.get<InviteHandler>(InviteHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should respond to !invite case insensitive', () => {
    expect(service.test('!invite')).toBeTruthy();
    expect(service.test('!INVITE')).toBeTruthy();
  });
});
