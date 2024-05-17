import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ default: 0 })
  currentLevel: number;

  @Column({ default: 0 })
  prizeMoney: number;

  @Column('int', { array: true, nullable: true })
  usedLifelines: number[];

  @Column('int', { array: true, nullable: true })
  questionId: number[];

  @Column({ nullable: true })
  status: string;

  @CreateDateColumn()
  createDate: string;
}
