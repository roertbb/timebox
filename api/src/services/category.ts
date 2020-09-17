import { Category } from "./../entities/Category";
import { PaginationParams } from "../types/utils";

export async function getAll({ skip, take }: PaginationParams) {
  return await Category.find({
    skip,
    take,
  });
}

export async function getById(id: number) {
  return await Category.findOneOrFail(id);
}

export async function create(params: Partial<Category>) {
  return await Category.create(params).save();
}

export async function update(id: number, params: Partial<Category>) {
  const category = await Category.findOneOrFail(id);
  const updatedCategory = Category.merge(category, params);

  // TODO: params validation?
  // - required fields - name, color, timelineId

  return await updatedCategory.save();
}

export async function remove(id: number) {
  return await Category.delete(id);
}
