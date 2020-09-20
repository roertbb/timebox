import { ErrorCode } from "./../types/utils";
import { Event } from "./../entities/Event";
import { PaginationParams } from "../types/utils";
import { getConnection, getRepository } from "typeorm";

export async function getAll(
  timelineId: number,
  { skip, take }: PaginationParams
) {
  return await getRepository(Event).find({ skip, take, where: { timelineId } });
}

export async function getById(
  id: number,
  timelineId: number,
  eventRepository = getRepository(Event)
) {
  try {
    return await eventRepository.findOneOrFail(id, { where: { timelineId } });
  } catch (error) {
    throw {
      message: "Couldn't find event with given id",
      statusCode: ErrorCode.NotFound,
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
      await getById(id, params.timelineId, eventRepository);
      await eventRepository.save({ id, ...params });
      const event = await eventRepository.findOneOrFail(id, {
        relations: ["row", "category"],
      });

      if (event.category && event.category.timelineId !== event.timelineId) {
        throw {
          message: "Event and category does not belong to the same timeline",
          statusCode: ErrorCode.BadRequest,
        };
      }

      if (event.row && event.row.timelineId !== event.timelineId) {
        throw {
          message: "Event and row does not belong to the same timeline",
          statusCode: ErrorCode.BadRequest,
        };
      }

      return event;
    });
  } catch (error) {
    if (error.statusCode) throw error;
    throw {
      message: "Event data is invalid or missing required fields",
      statusCode: ErrorCode.BadRequest,
    };
  }
}

export async function update(id: number, params: Partial<Event>) {
  try {
    await getConnection().transaction(async (tm) => {
      const eventRepository = tm.getRepository(Event);
      const event = await getById(id, params.timelineId, eventRepository);
      await eventRepository.save(eventRepository.merge(event, params));
      const savedEvent = await eventRepository.findOneOrFail(id, {
        relations: ["row", "category"],
      });

      if (
        savedEvent.category &&
        savedEvent.category.timelineId !== savedEvent.timelineId
      ) {
        throw {
          message: "Event and category does not belong to the same timeline",
          statusCode: ErrorCode.BadRequest,
        };
      }

      if (
        savedEvent.row &&
        savedEvent.row.timelineId !== savedEvent.timelineId
      ) {
        throw {
          message: "Event and row does not belong to the same timeline",
          statusCode: ErrorCode.BadRequest,
        };
      }

      return savedEvent;
    });
  } catch (error) {
    if (error.statusCode) throw error;
    throw {
      message: "Event data is invalid or missing required fields",
      statusCode: ErrorCode.BadRequest,
    };
  }
}

export async function remove(id: number, timelineId: number) {
  return await getRepository(Event).delete({ id, timelineId });
}
