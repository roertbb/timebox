import { Router } from "express";
import * as timeline from "./controller/timeline";

const router = Router({ mergeParams: true });

router.get("/timelines", timeline.getAll);

export default router;
