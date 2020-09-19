import { ErrorCode } from "./../types/utils";
import { getConnection, getRepository } from "typeorm";
import { Row } from "./../entities/Row";
import { PaginationParams } from "../types/utils";

export async function getAll({ skip, take }: PaginationParams) {
  return await getRepository(Row).find({ skip, take });
}

export async function getById(id: number, rowRepository = getRepository(Row)) {
  try {
    return await rowRepository.findOneOrFail(id);
  } catch (error) {
    throw {
      message: "Couldn't find row with given id",
      code: ErrorCode.NotFound,
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
      await getById(id, rowRepository);

      return await rowRepository.save({ id, ...params });
    });
  } catch (error) {
    throw {
      message: "Row data is invalid or missing required fields",
      code: ErrorCode.BadRequest,
    };
  }
}

export async function update(id: number, params: Partial<Row>) {
  try {
    await getConnection().transaction(async (tm) => {
      const rowRepository = tm.getRepository(Row);
      const row = await getById(id, rowRepository);

      const updatedRow = rowRepository.merge(row, params);
      return await rowRepository.save(updatedRow);
    });
  } catch (error) {
    throw {
      message: "Row data is invalid or missing required fields",
      code: ErrorCode.BadRequest,
    };
  }
}

export async function remove(id: number) {
  return await getRepository(Row).delete(id);
}
