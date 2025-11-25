import { Router } from "express";
import { getAll, getById, exportData, getStationsList, getAnalytics } from "../../controllers/sima/sima.controller";

const router = Router();


router.get("/all", getAll);

// As outras rotas continuam sem cache (tempo real)
router.get("/:idsima", getById);
router.post("/export", exportData);
router.get("/graph/stations", getStationsList);
router.get("/graph/analytics", getAnalytics);

export default router;  