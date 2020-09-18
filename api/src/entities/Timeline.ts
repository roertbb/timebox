import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Event } from "./Event";
import { Row } from "./Row";
import { Category } from "./Category";

@Entity({ name: "timelines" })
export class Timeline extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true })
  name: string;

  @Column("varchar", { nullable: true })
  description: string;

  @Column({ type: "timestamp", nullable: true })
  startsAt: string;

  @Column({ type: "timestamp", nullable: true })
  endsAt: string;

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
}
