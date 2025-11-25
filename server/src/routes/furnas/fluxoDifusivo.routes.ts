import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/fluxoDifusivo.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idFluxoDifusivo", getById);
router.post("/export", exportData);


export default router;