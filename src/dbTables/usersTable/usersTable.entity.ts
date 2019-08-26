import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersTableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  data: string;

  @Column()
  telephone: number;

  @Column()
  myLike: number;

  @Column()
  notesCount: number;
}
