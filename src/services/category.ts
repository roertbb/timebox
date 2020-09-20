import { ErrorCode } from "./../types/utils";
import { getConnection, getRepository } from "typeorm";
import { Category } from "./../entities/Category";
import { PaginationParams } from "../types/utils";

export async function getAll(
  timelineId: number,
  { skip, take }: PaginationParams
) {
  return await getRepository(Category).find({
    skip,
    take,
    where: { timelineId },
  });
}

export async function getById(
  id: number,
  timelineId: number,
  categoryRepository = getRepository(Category)
) {
  try {
    return await categoryRepository.findOneOrFail(id, {
      where: { timelineId },
    });
  } catch (error) {
    throw {
      message: "Couldn't find category with given id",
      statusCode: ErrorCode.NotFound,
    };
  }
}

export async function create(params: Partial<Category>) {
  return await getRepository(Category).create(params).save();
}

export async function put(id: number, params: Partial<Category>) {
  try {
    await getConnection().transaction(async (tm) => {
      const categoryRepository = tm.getRepository(Category);
      await getById(id, params.timelineId, categoryRepository);

      return await categoryRepository.save({ id, ...params });
    });
  } catch (error) {
    throw {
      message: "Category data is invalid or missing required fields",
      statusCode: ErrorCode.BadRequest,
    };
  }
}

export async function update(id: number, params: Partial<Category>) {
  try {
    await getConnection().transaction(async (tm) => {
      const categoryRepository = tm.getRepository(Category);
      const category = await getById(id, params.timelineId, categoryRepository);

      const updatedCategory = categoryRepository.merge(category, params);
      return await categoryRepository.save(updatedCategory);
    });
  } catch (error) {
    throw {
      message: "Category data is invalid or missing required fields",
      statusCode: ErrorCode.BadRequest,
    };
  }
}

export async function remove(id: number, timelineId: number) {
  return await getRepository(Category).delete({ id, timelineId });
}

export async function transferByTimelineId(
  categoryId: number,
  timelineId: number
) {
  try {
    await getConnection().transaction(async (tm) => {
      await tm.query(
        `update categories c set "timelineId" = $1 where c."id" = $2`,
        [timelineId, categoryId]
      );
      await tm.query(
        `update events e set "timelineId" = $1, "rowId" = NULL where e."categoryId" = $2`,
        [timelineId, categoryId]
      );
    });
  } catch (error) {
    throw {
      message: "Failed to transfer category to different timeline",
      statusCode: ErrorCode.BadRequest,
    };
  }
}
