import { Row } from "./../entities/Row";
import { PaginationParams } from "../types/utils";

export async function getAll({ skip, take }: PaginationParams) {
  return await Row.find({
    skip,
    take,
  });
}

export async function getById(id: number) {
  return await Row.findOneOrFail(id);
}

export async function create(params: Partial<Row>) {
  return await Row.create(params).save();
}

export async function update(id: number, params: Partial<Row>) {
  const row = await Row.findOneOrFail(id);
  const updatedRow = Row.merge(row, params);

  // TODO: params validation?
  // - required fields - name

  return await updatedRow.save();
}

export async function remove(id: number) {
  return await Row.delete(id);
}
