import { ErrorCode } from "./../types/utils";
import { getConnection, getRepository } from "typeorm";
import { Row } from "./../entities/Row";
import { PaginationParams } from "../types/utils";

export async function getAll(
  timelineId: number,
  { skip, take }: PaginationParams
) {
  return await getRepository(Row).find({ skip, take, where: { timelineId } });
}

export async function getById(
  id: number,
  timelineId: number,
  rowRepository = getRepository(Row)
) {
  try {
    return await rowRepository.findOneOrFail(id, { where: { timelineId } });
  } catch (error) {
    throw {
      message: "Couldn't find row with given id",
      statusCode: ErrorCode.NotFound,
    };
  }
}

export async function create(params: Partial<Row>) {
  return await getRepository(Row).create(params).save();
}

export async function put(id: number, params: Partial<Row>) {
  try {
    await getConnection().transaction(async (tm) => {
      const rowRepository = tm.getRepository(Row);
      await getById(id, params.timelineId, rowRepository);

      return await rowRepository.save({ id, ...params });
    });
  } catch (error) {
    throw {
      message: "Row data is invalid or missing required fields",
      statusCode: ErrorCode.BadRequest,
    };
  }
}

export async function update(id: number, params: Partial<Row>) {
  try {
    await getConnection().transaction(async (tm) => {
      const rowRepository = tm.getRepository(Row);
      const row = await getById(id, params.timelineId, rowRepository);

      const updatedRow = rowRepository.merge(row, params);
      return await rowRepository.save(updatedRow);
    });
  } catch (error) {
    throw {
      message: "Row data is invalid or missing required fields",
      statusCode: ErrorCode.BadRequest,
    };
  }
}

export async function remove(id: number, timelineId: number) {
  return await getRepository(Row).delete({ id, timelineId });
}
