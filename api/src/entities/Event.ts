import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
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

  @ManyToOne(() => Timeline, (timeline) => timeline.events)
  timeline: Timeline;

  @ManyToOne(() => Row, (row) => row.events)
  row: Row;

  @ManyToOne(() => Category, (category) => category.events)
  category: Category;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
