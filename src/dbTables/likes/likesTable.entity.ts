import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  noteId: number;

  @Column()
  userId: number;
}
