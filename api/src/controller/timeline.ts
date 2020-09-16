import { Timeline } from "./../entities/Timeline";

export function getAll(req, res) {
  res.json({ data: Timeline.find({}) });
}
