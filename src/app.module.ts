import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTableModule } from './dbTables/users/usersTable.module';
import { UsersLoginModule } from './users/usersLogin.module';
import { AuthModule } from './auth/auth.module';
import { AddNoteModule } from './modules/addNote/addNote.module';
import { FeaturesModule } from './modules/features/features.module';
import { LoginModule } from './modules/login/login.module';
import { LogsModule } from './modules/logs/logs.module';
import { MainModule } from './modules/main/main.module';
import { NotesModule } from './modules/notes/notes.module';
import { PageNotesModule } from './modules/pageNotes/pageNotes.module';
import { RegisterModule } from './modules/register/register.module';
import { CommentsTableModule } from './dbTables/comments/commentsTable.module';
import { LikesTableModule } from './dbTables/likes/likesTable.module';
import { NotesTableModule } from './dbTables/notes/notesTable.module';
import { NotesTagsTableModule } from './dbTables/notesTags/notesTagsTable.module';
import { TagsTableModule } from './dbTables/tags/tagsTable.module';
import { UsersModule } from './modules/users/users.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RegisterModule, AuthModule, UsersTableModule, AddNoteModule, FeaturesModule,
    LoginModule, LogsModule, MainModule, NotesModule, PageNotesModule,
    RegisterModule, CommentsTableModule, LikesTableModule, NotesTableModule, NotesTagsTableModule,
    TagsTableModule, UsersLoginModule, UsersModule, CommentsModule,
  ],
})
export class ApplicationModule {}
