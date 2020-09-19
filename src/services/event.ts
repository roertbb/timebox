import { ErrorCode } from "./../types/utils";
import { Event } from "./../entities/Event";
import { PaginationParams } from "../types/utils";
import { getConnection, getRepository } from "typeorm";

export async function getAll({ skip, take }: PaginationParams) {
  return await getRepository(Event).find({ skip, take });
}

export async function getById(
  id: number,
  eventRepository = getRepository(Event)
) {
  try {
    return await eventRepository.findOneOrFail(id);
  } catch (error) {
    throw {
      message: "Couldn't find event with given id",
      code: ErrorCode.NotFound,
    };
  }
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

export async function create(params: Partial<Event>) {
  return await getRepository(Event).create(params).save();
}

export async function put(id: number, params: Partial<Event>) {
  try {
    await getConnection().transaction(async (tm) => {
      const eventRepository = tm.getRepository(Event);
      await getById(id, eventRepository);

      return await eventRepository.save({ id, ...params });
    });
  } catch (error) {
    throw {
      message: "Event data is invalid or missing required fields",
      code: ErrorCode.BadRequest,
    };
  }
}

export async function update(id: number, params: Partial<Event>) {
  try {
    await getConnection().transaction(async (tm) => {
      const eventRepository = tm.getRepository(Event);
      const event = await getById(id, eventRepository);

      const updatedEvent = eventRepository.merge(event, params);
      return await eventRepository.save(updatedEvent);
    });
  } catch (error) {
    throw {
      message: "Event data is invalid or missing required fields",
      code: ErrorCode.BadRequest,
    };
  }
}

export async function remove(id: number) {
  return await getRepository(Event).delete(id);
}
