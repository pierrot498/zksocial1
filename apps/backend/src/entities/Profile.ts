// src/entities/Profile.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: "CASCADE", nullable: false })
  user!: User;

  @Column()
  bio!: string;

  @Column()
  age!: number;

  @Column()
  location!: string;
}
