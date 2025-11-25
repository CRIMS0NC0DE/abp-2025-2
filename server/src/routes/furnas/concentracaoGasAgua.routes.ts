import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/concentracaoGasAgua.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idConcentracaoGasAgua", getById);
router.post("/export", exportData);


export default router;