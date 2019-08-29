import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { Tags } from '../tags/tagsTable.entity';
import { Users } from '../users/usersTable.entity';
import { Comments } from '../comments/commentsTable.entity';
import { Likes } from '../likes/likesTable.entity';

@Entity()
export class Notes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  date: string;

  @Column()
  com_count: number;

  @OneToMany(type => Likes, (likes) => likes.note)
  public like: Likes[];

  @OneToMany(type => Comments, (comments) => comments.note)
  public comment: Comments[];

  @ManyToOne(type => Users, (user) => user.note)
  public user: Users;

  @OneToMany(type => Tags, (tag) => tag.note)
  public tag: Tags[];

}
