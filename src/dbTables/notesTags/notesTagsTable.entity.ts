import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotesTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note_id: number;

  @Column()
  tag_id: number;
}
