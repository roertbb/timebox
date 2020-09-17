import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
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
    nullable: true,
  })
  events: Event[];

  @Column()
  timelineId: number;

  @ManyToOne(() => Timeline, (timeline) => timeline.categories, {
    nullable: true,
  })
  timeline: Timeline;
}
