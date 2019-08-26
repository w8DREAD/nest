import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotesTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  noteId: number;

  @Column()
  tagId: number;
}
