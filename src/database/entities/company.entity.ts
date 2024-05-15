import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vacancy } from './vacancy.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  address: string;

  @CreateDateColumn({ nullable: false })
  foundedAt: Date;

  @Column({ type: 'text', nullable: false })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((nullable: false) => Vacancy, (vacancy) => vacancy.company)
  vacancies: Vacancy[];
}
