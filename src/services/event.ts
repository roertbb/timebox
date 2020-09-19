import { Event } from "./../entities/Event";
import { PaginationParams } from "../types/utils";
import { getRepository } from "typeorm";

export async function getAll({ skip, take }: PaginationParams) {
  return await Event.find({
    skip,
    take,
  });
}

export async function getAllByCategory(
  categoryId: number,
  { skip, take }: PaginationParams
) {
  return await getRepository(Event).find({
    skip,
    take,
    where: {
      categoryId,
    },
  });
}

export async function getAllByRow(
  rowId: number,
  { skip, take }: PaginationParams
) {
  return await getRepository(Event).find({
    skip,
    take,
    where: {
      rowId,
    },
  });
}

export async function getById(id: number) {
  return await Event.findOneOrFail(id);
}

export async function create(params: Partial<Event>) {
  return await Event.create(params).save();
}

export async function update(id: number, params: Partial<Event>) {
  const event = await Event.findOneOrFail(id);
  const updatedEvent = Event.merge(event, params);

  // TODO: params validation?
  // - required fields - name, timelineId
  // - startsAt before endsAt

  return await updatedEvent.save();
}

export async function remove(id: number) {
  return await Event.delete(id);
}
