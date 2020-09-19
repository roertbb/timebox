import { Router } from "express";
import { getAll, getById, create, update, remove } from "../services/category";
import { getAllByCategory } from "../services/event";

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const categories = await getAll({
    skip: req.skip,
    take: +req.query.limit,
  });
  res.send(categories);
});

router.get("/:categoryId", async (req, res) => {
  try {
    const category = await getById(+req.params.categoryId);
    res.send(category);
  } catch (error) {
    res.status(404).send({ message: "Category not found" });
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
    res.status(404).send({ message: "Category not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { id } = await create({
      ...req.body,
      timelineId: +req.params.timelineId,
    });
    res.status(201).send({ id });
  } catch (error) {
    res.status(500).send({ message: "Server failed to create category" });
  }
});

router.put("/:categoryId", async (req, res) => {
  // TODO: validate/pick params - req.body

  try {
    await update(+req.params.categoryId, {
      timelineId: +req.params.timelineId,
      ...req.body,
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Server failed to update category" });
  }
});

router.patch("/:categoryId", async (req, res) => {
  // TODO: validate/pick params - req.body

  try {
    await update(+req.params.categoryId, {
      timelineId: +req.params.timelineId,
      ...req.body,
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Server failed to update category" });
  }
});

router.delete("/:categoryId", async (req, res) => {
  try {
    await remove(+req.params.categoryId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Server failed to delete category" });
  }
});

export default router;
