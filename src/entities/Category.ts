import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  BeforeUpdate,
} from "typeorm";
import { IsDefined, validateOrReject } from "class-validator";
import pick = require("lodash.pick");
import { Event } from "./Event";
import { Timeline } from "./Timeline";

@Entity({ name: "categories" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @Column("varchar", { nullable: true })
  name: string;

  @Column("varchar", { nullable: true })
  description: string;

  @IsDefined()
  @Column("varchar", { nullable: true })
  color: string;

  @OneToMany(() => Event, (event) => event.category, {
    nullable: true,
  })
  events: Event[];

  @IsDefined()
  @Column()
  timelineId: number;

  @ManyToOne(() => Timeline, (timeline) => timeline.categories, {
    onDelete: "CASCADE",
  })
  timeline: Timeline;

  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}

export function parseParams(body: any) {
  return pick(body, ["name", "description", "color", "timelineId"]);
}
