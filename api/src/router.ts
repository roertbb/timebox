import { Router } from "express";
import timelineController from "./controllers/timeline";
import rowController from "./controllers/row";

const router = Router({ mergeParams: true });

router.use("/timelines", timelineController);
router.use("/timelines/:timelineId/rows", rowController);

export default router;
