import { Injectable } from '@nestjs/common';
import { NoteInterfaces } from '../interfaces/note.interfaces';

@Injectable()
export class NoteService {
  private note: NoteInterfaces;
create(note: NoteInterfaces) {
  return note;
  }
}
