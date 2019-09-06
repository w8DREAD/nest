import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Notes } from '../notes/notesTable.entity';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @ManyToOne(type => Notes, (note) => note.tag, { onDelete: 'CASCADE' })
  public note: Notes;
}
