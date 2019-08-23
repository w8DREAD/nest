import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersTableModule } from './dbTables/usersTable/usersTable.module';
import { AddNoteModule } from './modules/addNote/addNote.module';
import { FeaturesModule } from './modules/features/features.module';
import { LoginModule } from './modules/login/login.module';
import { LogoutModule } from './modules/logout/logout.module';
import { LogsModule } from './modules/logs/logs.module';
import { MainModule } from './modules/main/main.module';
import { NotesModule } from './modules/notes/notes.module';
import { PageNotesModule } from './modules/pageNotes/pageNotes.module';
import { RegisterModule } from './modules/register/register.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(), AuthModule, UsersModule, UsersTableModule, AddNoteModule, FeaturesModule,
            LoginModule, LogoutModule, LogsModule, MainModule, NotesModule, PageNotesModule,
            RegisterModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
