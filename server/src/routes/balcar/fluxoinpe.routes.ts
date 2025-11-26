import { Router } from "express";
import { getAll, getById, exportData, getAnalytics } from "../../controllers/balcar/fluxoinpe.controller";

const router = Router();


router.get("/all", getAll);
router.get("/:id", getById);
router.post("/export", exportData);
router.get("/graph/analytics", getAnalytics);


export default router;

