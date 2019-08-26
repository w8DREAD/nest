import { Test, TestingModule } from '@nestjs/testing';
import { UsersLoginService } from './usersLogin.service';

describe('UsersLoginService', () => {
  let service: UsersLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersLoginService],
    }).compile();

    service = module.get<UsersLoginService>(UsersLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
