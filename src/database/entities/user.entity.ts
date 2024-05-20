import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Vacancy } from './vacancy.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the user.' })
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  @ApiProperty({ example: 'John Doe', description: 'The name of the user.' })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user. Must be unique.' })
  email: string;

  @Column({ type: 'varchar', length: 64, nullable: false, select: false })
  @ApiProperty({ example: 'hashedpassword123', description: 'The hashed password of the user.', writeOnly: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    nullable: false,
    default: UserRoleEnum.CANDIDATE,
  })
  @ApiProperty({ example: UserRoleEnum.CANDIDATE, description: 'The role of the user in the system.' })
  role: UserRoleEnum;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.advertiser, { nullable: false })
  @ApiProperty({ type: () => Vacancy, isArray: true, description: 'List of vacancies associated with the user.' })
  vacancies: Vacancy[];

  @CreateDateColumn()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'The date and time when the user was created.' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2024-01-02T00:00:00.000Z', description: 'The date and time when the user was last updated.' })
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty({ example: '2024-01-03T00:00:00.000Z', description: 'The date and time when the user was deleted (soft delete).' })
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error with password hash.');
    }
  }
}
