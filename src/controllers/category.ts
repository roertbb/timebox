import { Router } from "express";
import { ErrorCode } from "./../types/utils";
import {
  getAll,
  getById,
  create,
  update,
  remove,
  put,
} from "../services/category";
import { getAllByCategory } from "../services/event";
import { parseParams } from "../entities/Category";

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const categories = await getAll(+req.params.timelineId, {
    skip: req.skip,
    take: +req.query.limit,
  });
  res.send(categories);
});

router.get("/:categoryId", async (req, res) => {
  const { categoryId, timelineId } = req.params;
  try {
    const category = await getById(+categoryId, +timelineId);
    res.send(category);
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.get("/:categoryId/events", async (req, res) => {
  try {
    const events = await getAllByCategory(+req.params.categoryId, {
      skip: req.skip,
      take: +req.query.limit,
    });
    res.send(events);
  } catch (error) {
    res.status(ErrorCode.NotFound).send({ message: "Category not found" });
  }
});

router.post("/", async (req, res) => {
  const timelineId = +req.params.timelineId;
  try {
    const { id } = await create({
      timelineId,
    });
    res.location(`/api/timelines/${timelineId}/categories/${id}`);
    res.status(ErrorCode.Created).send({ id });
  } catch (error) {
    res
      .status(ErrorCode.ServerError)
      .send({ message: "Server failed to create timeline" });
  }
});

router.put("/:categoryId", async (req, res) => {
  const { categoryId, timelineId } = req.params;
  try {
    const params = parseParams({ ...req.body, timelineId: +timelineId });
    await put(+categoryId, params);
    res.status(ErrorCode.NoContent).send();
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.patch("/:categoryId", async (req, res) => {
  const { categoryId, timelineId } = req.params;
  try {
    const params = parseParams({ ...req.body, timelineId: +timelineId });
    await update(+categoryId, params);
    res.status(ErrorCode.NoContent).send();
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.delete("/:categoryId", async (req, res) => {
  const { categoryId, timelineId } = req.params;
  try {
    await remove(+categoryId, +timelineId);
    res.status(ErrorCode.NoContent).send();
  } catch (error) {
    res
      .status(ErrorCode.ServerError)
      .send({ message: "Server failed to delete category" });
  }
});

export default router;
