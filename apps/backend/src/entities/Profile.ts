// src/entities/Profile.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: "CASCADE" })
  user!: User;

  @Column()
  name!: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true, type: "text" })
  image?: string;
}
