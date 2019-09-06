import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Users } from '../users/usersTable.entity';
import { Notes } from '../notes/notesTable.entity';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Notes, (note) => note.like, { onDelete: 'CASCADE' })
  public note: Notes;

  @ManyToOne(type => Users, (user) => user.like)
  public user: Users;
}
