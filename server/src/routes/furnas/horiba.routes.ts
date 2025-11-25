import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/horiba.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idHoriba", getById);
router.post("/export", exportData);


export default router;