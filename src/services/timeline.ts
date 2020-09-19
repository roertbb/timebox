import { ErrorCode } from "./../types/utils";
import { Timeline } from "./../entities/Timeline";
import { PaginationParams } from "../types/utils";
import { getConnection, getRepository } from "typeorm";

export async function getAll({ skip, take }: PaginationParams) {
  return await getRepository(Timeline).find({ skip, take });
}

export async function getById(
  id: number,
  timelineRepository = getRepository(Timeline)
) {
  try {
    return await timelineRepository.findOneOrFail(id);
  } catch (error) {
    throw {
      message: "Couldn't find timeline with given id",
      code: ErrorCode.NotFound,
    };
  }
}

export async function create(params: Partial<Timeline>) {
  return await getRepository(Timeline).create(params).save();
}

export async function put(id: number, params: Partial<Timeline>) {
  try {
    await getConnection().transaction(async (tm) => {
      const timelineRepository = tm.getRepository(Timeline);
      await getById(id, timelineRepository);

      return await timelineRepository.save({ id, ...params });
    });
  } catch (error) {
    throw {
      message: "Timeline data is invalid or missing required fields",
      code: ErrorCode.BadRequest,
    };
  }
}

export async function update(id: number, params: Partial<Timeline>) {
  try {
    await getConnection().transaction(async (tm) => {
      const timelineRepository = tm.getRepository(Timeline);
      const timeline = await getById(id, timelineRepository);

      const updatedTimeline = timelineRepository.merge(timeline, params);
      return await timelineRepository.save(updatedTimeline);
    });
  } catch (error) {
    throw {
      message: "Timeline data is invalid or missing required fields",
      code: ErrorCode.BadRequest,
    };
  }
}

export async function remove(id: number) {
  return await getRepository(Timeline).delete(id);
}
