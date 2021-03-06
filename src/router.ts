import { Router } from "express";
import timelineController from "./controllers/timeline";
import rowController from "./controllers/row";
import categoryController from "./controllers/category";
import eventController from "./controllers/event";
import categoryTransferController from "./controllers/categoryTransfer";

const router = Router({ mergeParams: true });

router.use("/timelines", timelineController);
router.use("/timelines/:timelineId/rows", rowController);
router.use("/timelines/:timelineId/categories", categoryController);
router.use("/timelines/:timelineId/events", eventController);
router.use("/category-transfers", categoryTransferController);

export default router;
