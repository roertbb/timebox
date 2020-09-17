import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Event } from "./Event";
import { Timeline } from "./Timeline";

@Entity({ name: "rows" })
export class Row extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true })
  name: string;

  @Column()
  timelineId: number;

  @ManyToOne(() => Timeline, (timeline) => timeline.rows)
  timeline: Timeline;

  @OneToMany(() => Event, (event) => event.row, {
    onDelete: "CASCADE",
    nullable: true,
  })
  events: Event[];
}
