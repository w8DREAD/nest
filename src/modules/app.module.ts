import { Module } from '@nestjs/common';
import { Notes } from '../controllers/notes';
import { AppService } from '../provider/app.service';
import { Main } from '../controllers/main';
import { addNotes } from '../controllers/addNotes';

@Module({
  imports: [],
  controllers: [Notes, Main, addNotes],
  providers: [AppService],
})
export class AppModule {}
