import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
import { Vacancy } from "./vacancy.entity";
  
  @Entity("company")
  export class Company {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 64, nullable: false, unique: true})
    name: string;
  
    @Column({ type: "varchar", length: 128, nullable: false })
    city: string;

    @Column({ type: "varchar", length: 128, nullable: false })
    state: string;

    @Column({ type: "varchar", length: 128, nullable: false })
    adress: string;

    @CreateDateColumn({ nullable: false })
    foundedAt: Date;

    @Column({ type: "text", nullable: false })
    description: string;

    @OneToMany(( nullable: false ) => Vacancy, (vacancy) => vacancy.companyId)
    vacancies: Vacancy[]
  
  }