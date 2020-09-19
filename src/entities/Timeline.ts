import { IsBeforeConstraint } from "./../validators/isBeforeConstraint";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  BeforeUpdate,
} from "typeorm";
import { IsDate, IsDefined, Validate, validateOrReject } from "class-validator";
import pick = require("lodash.pick");
import { Event } from "./Event";
import { Row } from "./Row";
import { Category } from "./Category";

@Entity({ name: "timelines" })
export class Timeline extends BaseEntity {
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

  @OneToMany(() => Event, (event) => event.timeline, {
    nullable: true,
  })
  events: Event[];

  @OneToMany(() => Row, (row) => row.timeline)
  rows: Row[];

  @OneToMany(() => Category, (category) => category.timeline, {
    nullable: true,
  })
  categories: Category[];

  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}

export function parseParams(body: any) {
  const fields = pick(body, ["name", "description", "startsAt", "endsAt"]);
  if (fields.startsAt) fields.startsAt = new Date(fields.startsAt);
  if (fields.endsAt) fields.endsAt = new Date(fields.endsAt);

  return fields;
}
