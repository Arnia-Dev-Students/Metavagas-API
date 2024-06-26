import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vacancy } from './vacancy.entity';

@Entity('technology')
export class Technology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  tecName: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  creatorsName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
