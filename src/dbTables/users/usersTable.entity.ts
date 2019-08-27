import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
