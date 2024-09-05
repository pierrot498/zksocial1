// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  walletAddress!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ type: "enum", enum: ["male", "female"] })
  gender!: "male" | "female";

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  profile?: Profile;
}
