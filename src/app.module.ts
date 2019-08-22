import { Module } from '@nestjs/common';
import { NoteService } from './provider/note.service';

import { PageNotes } from './controllers/pageNotes';
import { Main } from './controllers/main';
import { AddNote } from './controllers/addNote';
import { Logs } from './controllers/logs';
import { Features } from './controllers/features';
import { Register } from './controllers/register';
import { Login } from './controllers/login';
import { Logout } from './controllers/logout';
import { Notes } from './controllers/notes';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [PageNotes, Main, AddNote, Logs, Features, Register, Login, Logout, Notes],
  providers: [NoteService],
})
export class AppModule {}
