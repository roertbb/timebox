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

  @ManyToOne(() => Timeline, (timeline) => timeline.rows, { nullable: true })
  timeline: Timeline;

  @OneToMany(() => Event, (event) => event.row, {
    onDelete: "CASCADE",
  })
  events: Event[];
}
