import { Router } from "express";
import timelineController from "./controllers/timeline";
import rowController from "./controllers/row";
import categoryController from "./controllers/category";

const router = Router({ mergeParams: true });

router.use("/timelines", timelineController);
router.use("/timelines/:timelineId/rows", rowController);
router.use("/timelines/:timelineId/categories", categoryController);

export default router;
