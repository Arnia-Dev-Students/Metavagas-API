import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
import { Vacancy } from "./vacancy.entity";
  
  @Entity("tecnology")
  export class Tecnology {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 64, nullable: false, unique: true})
    tecName: string;

    @Column({ type: "varchar", length: 64, nullable: false })
    creatorsName: string;
  
    @ManyToMany(() => Vacancy, (vacancy) => vacancy.tecnologyId)
    @JoinTable()
    vacancyId: Vacancy[];
  }