import { ErrorCode } from "./../types/utils";
import { Router } from "express";
import { parseParams } from "../entities/Timeline";
import {
  getAll,
  getById,
  create,
  update,
  remove,
  put,
} from "../services/timeline";

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const timelines = await getAll({
    skip: req.skip,
    take: +req.query.limit,
  });
  res.send(timelines);
});

router.get("/:timelineId", async (req, res) => {
  try {
    const timeline = await getById(+req.params.timelineId);
    res.send(timeline);
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { id } = await create({});
    res.location(`/api/timelines/${id}`);
    res.status(ErrorCode.Created).send({ id });
  } catch (error) {
    res
      .status(ErrorCode.ServerError)
      .send({ message: "Server failed to create timeline" });
  }
});

router.put("/:timelineId", async (req, res) => {
  try {
    const params = parseParams(req.body);
    await put(+req.params.timelineId, params);
    res.status(ErrorCode.NoContent).send();
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.patch("/:timelineId", async (req, res) => {
  try {
    const params = parseParams(req.body);
    await update(+req.params.timelineId, params);
    res.status(ErrorCode.NoContent).send();
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.delete("/:timelineId", async (req, res) => {
  try {
    await remove(+req.params.timelineId);
    res.status(ErrorCode.NoContent).send();
  } catch (error) {
    res
      .status(ErrorCode.ServerError)
      .send({ message: "Server failed to delete timeline" });
  }
});

export default router;
