import { ErrorCode } from "./../types/utils";
import { Router } from "express";
import { getAllByRow } from "../services/event";
import { getAll, getById, create, update, remove, put } from "../services/row";
import { parseParams } from "../entities/Row";

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
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
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
    res.status(ErrorCode.NotFound).send({ message: "Row not found" });
  }
});

router.post("/", async (req, res) => {
  const timelineId = +req.params.timelineId;
  try {
    const { id } = await create({
      timelineId,
    });
    res.location(`/api/timelines/${timelineId}/rows/${id}`);
    res.status(ErrorCode.Created).send({ id });
  } catch (error) {
    res
      .status(ErrorCode.ServerError)
      .send({ message: "Server failed to create row" });
  }
});

router.put("/:rowId", async (req, res) => {
  const timelineId = +req.params.timelineId;
  try {
    const params = parseParams({ ...req.body, timelineId });
    await put(+req.params.rowId, params);
    res.status(ErrorCode.NoContent).send();
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.patch("/:rowId", async (req, res) => {
  const timelineId = +req.params.timelineId;
  try {
    const params = parseParams({ ...req.body, timelineId });
    await update(+req.params.rowId, params);
    res.status(ErrorCode.NoContent).send();
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.delete("/:rowId", async (req, res) => {
  try {
    await remove(+req.params.rowId);
    res.status(ErrorCode.NoContent).send();
  } catch (error) {
    res
      .status(ErrorCode.ServerError)
      .send({ message: "Server failed to delete row" });
  }
});

export default router;
