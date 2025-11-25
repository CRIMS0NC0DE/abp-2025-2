import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/gasesEmBolhas.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idGasesEmBolhas", getById);
router.post("/export", exportData);


export default router;