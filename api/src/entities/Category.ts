import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Event } from "./Event";
import { Timeline } from "./Timeline";

@Entity({ name: "categories" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true })
  name: string;

  @Column("varchar", { nullable: true })
  description: string;

  @Column("varchar", { nullable: true })
  color: string;

  @OneToMany(() => Event, (event) => event.category, {
    onDelete: "CASCADE",
  })
  events: Event[];

  @ManyToOne(() => Timeline, (timeline) => timeline.categories)
  timeline: Timeline;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
