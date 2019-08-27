import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note_id: number;

  @Column()
  user_id: number;
}
