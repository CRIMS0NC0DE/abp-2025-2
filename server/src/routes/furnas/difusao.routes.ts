import { Router } from "express";
import {getAll, getById, exportData, getAnalytics} from "../../controllers/furnas/difusao.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idDifusao", getById);
router.post("/export", exportData);
router.get("/graph/analytics", getAnalytics);


export default router;