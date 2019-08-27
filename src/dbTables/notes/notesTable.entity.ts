import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  date: string;

  @Column()
  user_id: number;

  @Column()
  com_count: number;
}
