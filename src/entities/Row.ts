import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  BeforeUpdate,
} from "typeorm";
import { IsDefined, validateOrReject } from "class-validator";
import pick = require("lodash.pick");
import { Event } from "./Event";
import { Timeline } from "./Timeline";

@Entity({ name: "rows" })
export class Row extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @Column("varchar", { nullable: true })
  name: string;

  @IsDefined()
  @Column()
  timelineId: number;

  @ManyToOne(() => Timeline, (timeline) => timeline.rows, {
    onDelete: "CASCADE",
  })
  timeline: Timeline;

  @OneToMany(() => Event, (event) => event.row, {
    nullable: true,
  })
  events: Event[];

  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}

export function parseParams(body: any) {
  return pick(body, ["name", "timelineId"]);
}
