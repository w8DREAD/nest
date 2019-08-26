import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  noteId: number;

  @Column()
  userId: number;
}
