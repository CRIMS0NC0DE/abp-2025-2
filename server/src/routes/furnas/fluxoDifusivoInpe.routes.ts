import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/fluxoDifusivoInpe.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idFluxoDifusivoInpe", getById);
router.post("/export", exportData);


export default router;