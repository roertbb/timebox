import { ErrorCode } from "./../types/utils";
import { Router } from "express";
import { getAllByRow } from "../services/event";
import { getAll, getById, create, update, remove, put } from "../services/row";
import { parseParams } from "../entities/Row";

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const rows = await getAll(+req.params.timelineId, {
    skip: req.skip,
    take: +req.query.limit,
  });
  res.send(rows);
});

router.get("/:rowId", async (req, res) => {
  const { rowId, timelineId } = req.params;
  try {
    const row = await getById(+rowId, +timelineId);
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
  const { rowId, timelineId } = req.params;
  try {
    const params = parseParams({ ...req.body, timelineId: +timelineId });
    await put(+rowId, params);
    res.status(ErrorCode.NoContent).send();
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.patch("/:rowId", async (req, res) => {
  const { rowId, timelineId } = req.params;
  try {
    const params = parseParams({ ...req.body, timelineId: +timelineId });
    await update(+rowId, params);
    res.status(ErrorCode.NoContent).send();
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

router.delete("/:rowId", async (req, res) => {
  const { rowId, timelineId } = req.params;
  try {
    await remove(+rowId, +timelineId);
    res.status(ErrorCode.NoContent).send();
  } catch (error) {
    res
      .status(ErrorCode.ServerError)
      .send({ message: "Server failed to delete row" });
  }
});

export default router;
