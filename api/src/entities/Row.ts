import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
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

  @ManyToOne(() => Timeline, (timeline) => timeline.rows)
  timeline: Timeline;

  @OneToMany(() => Event, (event) => event.row, {
    onDelete: "CASCADE",
  })
  events: Event[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
