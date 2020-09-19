import { ErrorCode } from "./../types/utils";
import { getConnection, getRepository } from "typeorm";
import { Category } from "./../entities/Category";
import { PaginationParams } from "../types/utils";

export async function getAll({ skip, take }: PaginationParams) {
  return await getRepository(Category).find({ skip, take });
}

export async function getById(
  id: number,
  categoryRepository = getRepository(Category)
) {
  try {
    return await categoryRepository.findOneOrFail(id);
  } catch (error) {
    throw {
      message: "Couldn't find category with given id",
      code: ErrorCode.NotFound,
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
      await getById(id, categoryRepository);

      return await categoryRepository.save({ id, ...params });
    });
  } catch (error) {
    throw {
      message: "Category data is invalid or missing required fields",
      code: ErrorCode.BadRequest,
    };
  }
}

export async function update(id: number, params: Partial<Category>) {
  try {
    await getConnection().transaction(async (tm) => {
      const categoryRepository = tm.getRepository(Category);
      const category = await getById(id, categoryRepository);

      const updatedCategory = categoryRepository.merge(category, params);
      return await categoryRepository.save(updatedCategory);
    });
  } catch (error) {
    throw {
      message: "Category data is invalid or missing required fields",
      code: ErrorCode.BadRequest,
    };
  }
}

export async function remove(id: number) {
  return await getRepository(Category).delete(id);
}
