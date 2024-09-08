import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User";
import { Profile } from "./Profile";

@Entity()
export class Swipe {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.id)
  swiper!: User;

  @ManyToOne(() => Profile, (profile) => profile.id)
  targetProfile!: Profile;

  @Column()
  action!: "like" | "dislike";

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}