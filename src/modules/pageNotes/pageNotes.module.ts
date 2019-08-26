import { Module } from '@nestjs/common';
import { PageNotesController } from './pageNotes.controller';
import { PageNotesService } from './pageNotes.service';
import { UsersTableModule } from '../../dbTables/users/usersTable.module';

@Module({
  imports: [UsersTableModule],
  controllers: [PageNotesController],
  providers: [PageNotesService],
  exports: [PageNotesService],
})
export class PageNotesModule {}
