import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  note_id: number;

  @Column()
  user_id: number;
}
