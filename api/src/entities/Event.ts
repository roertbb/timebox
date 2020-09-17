import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Category } from "./Category";
import { Row } from "./Row";
import { Timeline } from "./Timeline";

@Entity({ name: "events" })
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true })
  name: string;

  @Column("varchar", { nullable: true })
  description: string;

  @ManyToOne(() => Timeline, (timeline) => timeline.events, {
    nullable: true,
  })
  timeline: Timeline;

  @ManyToOne(() => Row, (row) => row.events, { nullable: true })
  row: Row;

  @ManyToOne(() => Category, (category) => category.events, {
    nullable: true,
  })
  category: Category;
}
