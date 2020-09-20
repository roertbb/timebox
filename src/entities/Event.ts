import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  BeforeUpdate,
  JoinColumn,
} from "typeorm";
import { IsDate, IsDefined, Validate, validateOrReject } from "class-validator";
import pick = require("lodash.pick");
import { Category } from "./Category";
import { Row } from "./Row";
import { Timeline } from "./Timeline";
import { IsBeforeConstraint } from "./../validators/isBeforeConstraint";

@Entity({ name: "events" })
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @Column("varchar", { nullable: true })
  name: string;

  @Column("varchar", { nullable: true })
  description: string;

  @IsDefined()
  @IsDate()
  @Validate(IsBeforeConstraint, ["endsAt"])
  @Column({ type: "timestamp", nullable: true })
  startsAt: Date;

  @IsDefined()
  @IsDate()
  @Column({ type: "timestamp", nullable: true })
  endsAt: Date;

  @IsDefined()
  @Column()
  timelineId: number;

  @ManyToOne(() => Timeline, (timeline) => timeline.events, {
    nullable: true,
    onDelete: "CASCADE",
  })
  timeline: Timeline;

  @Column({ nullable: true })
  rowId: number;

  @ManyToOne(() => Row, (row) => row.events, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  row: Row;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.events, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  category: Category;

  @BeforeUpdate()
  async validate() {
    console.log("validate", this);
    await validateOrReject(this);
  }
}

export function parseParams(body: any) {
  const fields = pick(body, [
    "name",
    "description",
    "startsAt",
    "endsAt",
    "timelineId",
    "rowId",
    "categoryId",
  ]);
  if (fields.startsAt) fields.startsAt = new Date(fields.startsAt);
  if (fields.endsAt) fields.endsAt = new Date(fields.endsAt);

  return fields;
}
