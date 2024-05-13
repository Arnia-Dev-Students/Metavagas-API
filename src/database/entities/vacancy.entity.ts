import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Tecnology } from './tecnology.entity';
import { Company } from './company.entity';

@Entity('vacancy')
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80, nullable: false })
  vacancyRole: string;

  @Column({ type: 'int', nullable: false })
  wage: number;

  @Column({ type: 'varchar', length: 80, nullable: false })
  location: string;

  @Column({ type: 'varchar', length: 80, nullable: false })
  vacancyType: string;

  @Column({ type: 'text', nullable: false })
  vacancyDescription: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  level: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((nullable: false) => User, (user) => user.vacancies)
  advertiser: User;

  @ManyToOne((nullable: false) => Company, (company) => company.vacancies)
  company: Company;

  @ManyToMany(() => Tecnology, (tecnology) => tecnology.vacancies)
  technologies: Tecnology[];
}
