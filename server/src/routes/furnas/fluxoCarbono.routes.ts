import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/fluxoCarbono.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idFluxoCarbono", getById);
router.post("/export", exportData);


export default router;