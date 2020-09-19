import { Router } from "express";
import { getAllByRow } from "../services/event";
import { getAll, getById, create, update, remove } from "../services/row";

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const rows = await getAll({
    skip: req.skip,
    take: +req.query.limit,
  });
  res.send(rows);
});

router.get("/:rowId", async (req, res) => {
  try {
    const row = await getById(+req.params.rowId);
    res.send(row);
  } catch (error) {
    res.status(404).send({ message: "Row not found" });
  }
});

router.get("/:rowId/events", async (req, res) => {
  try {
    const events = await getAllByRow(+req.params.rowId, {
      skip: req.skip,
      take: +req.query.limit,
    });
    res.send(events);
  } catch (error) {
    res.status(404).send({ message: "Row not found" });
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
    res.status(500).send({ message: "Server failed to create row" });
  }
});

router.put("/:rowId", async (req, res) => {
  // TODO: validate/pick params - req.body

  try {
    await update(+req.params.rowId, {
      timelineId: +req.params.timelineId,
      ...req.body,
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Server failed to update row" });
  }
});

router.patch("/:rowId", async (req, res) => {
  // TODO: validate/pick params - req.body

  try {
    await update(+req.params.rowId, {
      timelineId: +req.params.timelineId,
      ...req.body,
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Server failed to update row" });
  }
});

router.delete("/:rowId", async (req, res) => {
  try {
    await remove(+req.params.rowId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Server failed to delete row" });
  }
});

export default router;
