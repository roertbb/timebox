import { Router } from "express";
import { getAll, getById, create, update, remove } from "../services/event";

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const events = await getAll({
    skip: req.skip,
    take: +req.query.limit,
  });
  res.send(events);
});

router.get("/:eventId", async (req, res) => {
  try {
    const event = await getById(+req.params.eventId);
    res.send(event);
  } catch (error) {
    res.status(404).send({ message: "Event not found" });
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
    res.status(500).send({ message: "Server failed to create event" });
  }
});

router.put("/:eventId", async (req, res) => {
  // TODO: validate/pick params - req.body

  try {
    await update(+req.params.eventId, {
      timelineId: +req.params.timelineId,
      ...req.body,
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Server failed to update event" });
  }
});

router.patch("/:eventId", async (req, res) => {
  // TODO: validate/pick params - req.body

  try {
    await update(+req.params.eventId, {
      timelineId: +req.params.timelineId,
      ...req.body,
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Server failed to update event" });
  }
});

router.delete("/:eventId", async (req, res) => {
  try {
    await remove(+req.params.eventId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Server failed to delete event" });
  }
});

export default router;
