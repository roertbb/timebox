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

  @Column({ type: "timestamp", nullable: true })
  startsAt: string;

  @Column({ type: "timestamp", nullable: true })
  endsAt: string;

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
  row: Row;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.events, {
    nullable: true,
    onDelete: "CASCADE",
  })
  category: Category;
}
