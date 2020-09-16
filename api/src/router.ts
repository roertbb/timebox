import { Router } from "express";
import timelineController from "./controllers/timeline";

const router = Router({ mergeParams: true });

router.use("/timelines", timelineController);

export default router;
