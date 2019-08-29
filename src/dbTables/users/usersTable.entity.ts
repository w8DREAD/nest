import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Notes } from '../notes/notesTable.entity';
import { Comments } from '../comments/commentsTable.entity';
import { Likes } from '../likes/likesTable.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  date: string;

  @Column()
  telephone: number;

  @Column()
  my_like: number;

  @Column()
  notes_count: number;

  @OneToMany(type => Notes, (notes) => notes.user)
  public note: Notes[];

  @OneToMany(type => Comments, (comment) => comment.user)
  public comment: Comments[];

  @OneToMany(type => Likes, (like) => like.user)
  public like: Likes[];
}
