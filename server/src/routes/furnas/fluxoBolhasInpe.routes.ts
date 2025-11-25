import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/fluxoBolhasInpe.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idFluxoBolhasInpe", getById);
router.post("/export", exportData);


export default router;