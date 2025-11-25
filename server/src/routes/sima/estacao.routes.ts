import { Router } from "express";
import { getAll, getById, exportData } from "../../controllers/sima/estacao.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idestacao", getById);
router.post("/export", exportData);


export default router;