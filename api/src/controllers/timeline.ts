import { Router } from "express";
import { getAll, getById, create, update, remove } from "../services/timeline";

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
  } catch (error) {
    res.status(404).send({ message: "Timeline not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { id } = await create(req.body);
    res.send({ id });
  } catch (error) {
    res.status(500).send({ message: "Server failed to create timeline" });
  }
});

router.put("/:timelineId", async (req, res) => {
  // TODO: validate/pick params - req.body

  try {
    await update(+req.params.timelineId, req.body);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Server failed to update timeline" });
  }
});

router.patch("/:timelineId", async (req, res) => {
  // TODO: validate/pick params - req.body

  try {
    await update(+req.params.timelineId, req.body);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Server failed to update timeline" });
  }
});

router.delete("/:timelineId", async (req, res) => {
  try {
    await remove(+req.params.timelineId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Server failed to delete timeline" });
  }
});

export default router;
