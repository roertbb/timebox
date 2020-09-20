import { ErrorCode } from "./../types/utils";
import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
  put,
} from "../services/event";
import { parseParams } from "../entities/Event";

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const events = await getAll(+req.params.timelineId, {
    skip: req.skip,
    take: +req.query.limit,
  });
  res.send(events);
});

router.get("/:eventId", async (req, res) => {
  const { eventId, timelineId } = req.params;
  try {
    const event = await getById(+eventId, +timelineId);
    res.send(event);
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.post("/", async (req, res) => {
  const timelineId = +req.params.timelineId;
  try {
    const { id } = await create({ timelineId });
    res.location(`/api/timelines/${timelineId}/events/${id}`);
    res.status(ErrorCode.Created).send({ id });
  } catch (error) {
    res
      .status(ErrorCode.ServerError)
      .send({ message: "Server failed to create event" });
  }
});

router.put("/:eventId", async (req, res) => {
  const { eventId, timelineId } = req.params;
  try {
    const params = parseParams({ ...req.body, timelineId: +timelineId });
    await put(+eventId, params);
    res.status(ErrorCode.NoContent).send();
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.patch("/:eventId", async (req, res) => {
  const { eventId, timelineId } = req.params;
  try {
    const params = parseParams({ ...req.body, timelineId: +timelineId });
    await update(+eventId, params);
    res.status(ErrorCode.NoContent).send();
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.delete("/:eventId", async (req, res) => {
  const { eventId, timelineId } = req.params;
  try {
    await remove(+eventId, +timelineId);
    res.status(ErrorCode.NoContent).send();
  } catch (error) {
    res
      .status(ErrorCode.ServerError)
      .send({ message: "Server failed to delete event" });
  }
});

export default router;
