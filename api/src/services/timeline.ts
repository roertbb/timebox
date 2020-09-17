import { Timeline } from "./../entities/Timeline";
import { PaginationParams } from "../types/utils";

export async function getAll({ skip, take }: PaginationParams) {
  return await Timeline.find({
    skip,
    take,
  });
}

export async function getById(id: number) {
  return await Timeline.findOneOrFail(id);
}

export async function create(params: Partial<Timeline>) {
  return await Timeline.create(params).save();
}

export async function update(id: number, params: Partial<Timeline>) {
  const timeline = await Timeline.findOneOrFail(id);
  const updateTimeline = Timeline.merge(timeline, params);

  // TODO: params validation?
  // - required fields - name, startsAt, endsAt
  // - startsAt before endsAt

  return await updateTimeline.save();
}

export async function remove(id: number) {
  return await Timeline.delete(id);
}
