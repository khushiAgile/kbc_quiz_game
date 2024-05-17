import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lifeline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lifeLine: string;

  @Column()
  description: string;
}
