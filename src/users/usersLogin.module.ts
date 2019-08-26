import { Module } from '@nestjs/common';
import { UsersLoginService } from './usersLogin.service';

@Module({
  providers: [UsersLoginService],
  exports: [UsersLoginService],
})
export class UsersLoginModule {}
