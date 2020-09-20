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
  const timelineId = +req.params.timelineId;

  try {
    const params = parseParams({ ...req.body, timelineId });
    await put(+req.params.eventId, params);
    res.status(ErrorCode.NoContent).send();
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.patch("/:eventId", async (req, res) => {
  const timelineId = +req.params.timelineId;
  try {
    const params = parseParams({ ...req.body, timelineId });
    await update(+req.params.eventId, params);
    res.status(ErrorCode.NoContent).send();
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.delete("/:eventId", async (req, res) => {
  try {
    await remove(+req.params.eventId);
    res.status(ErrorCode.NoContent).send();
  } catch (error) {
    res
      .status(ErrorCode.ServerError)
      .send({ message: "Server failed to delete event" });
  }
});

export default router;
