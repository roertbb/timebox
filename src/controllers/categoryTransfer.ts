import { ErrorCode } from "../types/utils";
import { Router } from "express";
import { transferByTimelineId } from "../services/category";

const router = Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const { timelineId, categoryId } = req.body;
  try {
    await transferByTimelineId(categoryId, timelineId);
    res.status(ErrorCode.NoContent).send();
  } catch ({ statusCode, message }) {
    res.status(statusCode).send({ message });
  }
});

export default router;
