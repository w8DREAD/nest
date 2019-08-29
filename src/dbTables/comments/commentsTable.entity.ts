import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from '../users/usersTable.entity';
import { Notes } from '../notes/notesTable.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(type => Notes, (note) => note.comment, { onDelete: 'CASCADE' })
  public note: Notes;

  @ManyToOne(type => Users, (user) => user.comment)
  public user: Comments;
}
