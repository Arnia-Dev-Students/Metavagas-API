import { BadRequestException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Vacancy } from "./vacancy.entity";


@Entity("user")
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 64, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 64, nullable: false, select: false })
  password: string;

 /* @Column({
    type: "enum",
    enum: RoleEnum,
    nullable: false,
    default: RoleEnum.candidate,
  })
  role: RoleEnum;*/

  @OneToMany(( nullable: false ) => Vacancy, (vacancy) => vacancy.advertiserId)
  vacancies: Vacancy[]; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Error with password hash.");
    }
  }
}